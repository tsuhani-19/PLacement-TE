from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
import joblib
import pandas as pd
import numpy as np
from collections import Counter
import re
import traceback
import os
import logging

app = FastAPI()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
   allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Log all requests
@app.middleware("http")
async def log_requests(request, call_next):
    logger.info(f"Request: {request.method} {request.url} Origin: {request.headers.get('origin')}")
    response = await call_next(request)
    logger.info(f"Response status: {response.status_code} Headers: {response.headers}")
    return response
# Catch-all OPTIONS handler
@app.options("/{path:path}")
async def handle_options(path: str):
    headers = {
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
    }
    return JSONResponse(content={"message": "OK"}, headers=headers)

DB_URL = "mongodb+srv://admin:Nigar27%40@career.7wve8.mongodb.net/career?retryWrites=true&w=majority&appName=career"
client = MongoClient(DB_URL)
db = client.career
users_collection = db.users

DATA_PATH = "/Users/sayyednigar/PLacement-TE/backend/PlacementDataset.xlsx"
if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Excel file not found at: {DATA_PATH}")
df = pd.read_excel(DATA_PATH, sheet_name="CLG DRIVES")
df.columns = df.columns.str.strip()
logger.info(f"Excel columns: {list(df.columns)}")
logger.info(f"Sample companies: {df['COMPANY NAME'].unique()[:5]}")

def clean_skills(skill_text):
    if pd.isna(skill_text) or not skill_text:
        return []
    if isinstance(skill_text, list):
        skills = skill_text
    else:
        # Split on commas, slashes, and newlines
        skills = re.split(r'[,/\n]', str(skill_text))
    
    cleaned = set()
    for skill in skills:
        skill = re.sub(r'Programming:\s*', '', skill.strip())  # Remove "Programming:" if present
        skill = skill.replace('(', '').replace(')', '').strip()  # Remove brackets and extra spaces
        if skill:
            cleaned.add(skill.lower())  # Convert to lowercase for consistency
    
    return list(cleaned)

df['cleaned_skills'] = df['skills'].apply(clean_skills)
median_selection_rate = (df['SELECTED NO. OF STUDENTS'] / df['NO.OF PARTICIPANTS']).median()
df['is_successful'] = (df['SELECTED NO. OF STUDENTS'] / df['NO.OF PARTICIPANTS']) > median_selection_rate

MODEL_PATH = "backend/naive_bayes_predictor.pkl"
try:
    model_assets = joblib.load(MODEL_PATH)
    model = model_assets["model"]
    vectorizer = model_assets["vectorizer"]
    median_selection_rate = model_assets["median_selection_rate"]
    logger.info("✅ ML Model loaded successfully")
except Exception as e:
    logger.error(f"❌ Error loading ML model: {e}")
    raise RuntimeError("Failed to load ML model")

def get_top_skills(df_filtered):
    if df_filtered is None or len(df_filtered) == 0:
        logger.info("No filtered data, returning empty skills")
        return []
    successful = df_filtered[df_filtered['is_successful']]
    logger.info(f"Successful rows: {len(successful)}")
    all_skills = []
    for skills in successful['cleaned_skills']:
        all_skills.extend(skills)
    top_skills = [skill for skill, count in Counter(all_skills).most_common(10)]
    logger.info(f"Top skills for filtered data: {top_skills}")
    return top_skills

def get_skills_gap(user_skills, required_skills):
    missing = []
    user_skills_lower = [s.lower() for s in user_skills]
    for req_skill in required_skills:
        if not any(sub_skill.strip().lower() in user_skills_lower
                  for sub_skill in req_skill.split('/')):
            missing.append(req_skill)
    return missing

@app.post("/predict/{user_id}")
async def predict_job_readiness(user_id: str):
    try:
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        raw_skills = user.get("skills", [])
        raw_company = user.get("preferedcompany", "")
        if not raw_skills:
            raise HTTPException(status_code=400, detail="User has no skills listed")

        user_skills = clean_skills(raw_skills)
        company_name = raw_company.strip() if raw_company else "ACCENTURE"
        if not company_name:
            company_name = "ACCENTURE"
        logger.info(f"Raw user data: {user}")
        logger.info(f"Raw company: {raw_company}, Processed company: {company_name}")
        logger.info(f"User skills: {user_skills}, Company: {company_name}")

        target_df = df.copy()
        if company_name:
            target_df = target_df[target_df['COMPANY NAME'].str.strip().str.upper() == company_name.strip().upper()]
            logger.info(f"Filtered rows for {company_name}: {len(target_df)}")
            logger.info(f"Matching companies: {target_df['COMPANY NAME'].unique()}")
            if len(target_df) == 0:
                raise HTTPException(status_code=404, detail=f"No data found for company: {company_name}")

        required_skills = get_top_skills(target_df)
        missing_skills = get_skills_gap(user_skills, required_skills)

        features = ' '.join(user_skills)
        proba = model.predict_proba(vectorizer.transform([features]))[0][1]
        is_ready = (proba > median_selection_rate) and (len(missing_skills) == 0)

        response = {
            "probability_score": round(float(proba), 2),
            "selection_threshold": round(float(median_selection_rate), 2),
            "job_ready": is_ready,
            "missing_skills_count": len(missing_skills),
            "missing_skills": missing_skills,
            "your_skills": user_skills,
            "target_company": company_name,
            "required_skills": required_skills,
            "success_chance": "High" if proba > 0.7 else "Medium" if proba > 0.4 else "Low",
            "explanation": "Fully meets requirements" if is_ready else f"Missing {len(missing_skills)} skills" if missing_skills else "Low probability"
        }
        logger.info(f"Response: {response}")
        return response
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5002)