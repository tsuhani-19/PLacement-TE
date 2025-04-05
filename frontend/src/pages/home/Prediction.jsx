import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle, FaTimesCircle, FaArrowRight, FaRegSmileBeam, FaRegLightbulb } from 'react-icons/fa';

// Corrected styled components with proper template literals
const ResultContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0,0,0,0.1);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
  
  .company-name {
    font-size: 1.2rem;
    color: #7f8c8d;
    font-weight: 500;
  }
`;

const ResultCard = styled.div`
  background: ${props => props.ready ? 'linear-gradient(135deg, #e8f5e9, #c8e6c9)' : 'linear-gradient(135deg, #ffebee, #ffcdd2)'};
  border-left: 6px solid ${props => props.ready ? '#2e7d32' : '#c62828'};
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  
  h3 {
    color: ${props => props.ready ? '#2e7d32' : '#c62828'};
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1.5rem;
  }
  
  .match-percentage {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 1rem 0;
    color: ${props => props.ready ? '#2e7d32' : '#c62828'};
  }
  
  .result-message {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const SuccessCelebration = styled.div`
  background: #e8f5e9;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  gap: 15px;
  
  svg {
    color: #2e7d32;
    font-size: 2rem;
    flex-shrink: 0;
  }
  
  div {
    h4 {
      color: #2e7d32;
      margin: 0 0 0.5rem 0;
    }
    
    p {
      margin: 0;
      color: #455a64;
    }
  }
`;

const SkillsSection = styled.div`
  margin-top: 2rem;
  
  h4 {
    color: #2c3e50;
    border-bottom: 2px solid #eee;
    padding-bottom: 0.5rem;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SkillItem = styled.li`
  background: ${props => props.known ? '#e8f5e9' : '#f5f5f5'};
  padding: 1rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${props => props.known ? '#a5d6a7' : '#e0e0e0'};
  
  svg {
    color: ${props => props.known ? '#2e7d32' : '#f44336'};
    font-size: 1.2rem;
  }
  
  span {
    font-weight: ${props => props.known ? '500' : '400'};
  }
`;

const RecommendationSection = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
  
  h4 {
    color: #0d47a1;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.3rem;
  }
  
  ul {
    padding-left: 1.5rem;
    margin: 0 0 1rem 0;
  }
  
  li {
    margin-bottom: 0.8rem;
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: "→";
      position: absolute;
      left: 0;
      color: #2196f3;
    }
  }
  
  p {
    margin: 1rem 0 0 0;
    font-style: italic;
    color: #546e7a;
  }
`;

const NextSteps = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: #fff8e1;
  border-radius: 8px;
  border-left: 4px solid #ffa000;
  
  h4 {
    color: #e65100;
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  p {
    margin: 0.5rem 0;
    line-height: 1.6;
  }
`;

const Prediction = () => {
  const location = useLocation();
  
  // Transform backend data to match component expectations
  const backendResult = location.state?.result || {
    job_ready: false,
    missing_skills: [],
    your_skills: [],
    required_skills: [],
    target_company: "Unknown Company",
    probability_score: 0
  };

  const result = {
    company: backendResult.target_company,
    your_skills: Array.isArray(backendResult.your_skills) ? backendResult.your_skills : [],
    top_required_skills: Array.isArray(backendResult.required_skills) ? backendResult.required_skills : [],
    missing_skills: Array.isArray(backendResult.missing_skills) ? backendResult.missing_skills : [],
    match_percentage: Math.round((backendResult.probability_score || 0) * 100),
    is_ready: backendResult.job_ready || false,
    explanation: backendResult.explanation || ""
  };

  // Clean up skills with newlines and normalize
  const cleanSkills = (skills) => {
    if (!Array.isArray(skills)) return [];
    return skills.flatMap(skill => 
      skill.split('\n')
        .map(s => s.trim())
        .filter(s => s)
        .map(s => s.replace(/^skills?:/i, '').trim())
    );
  };

  // Apply cleaning to all skill arrays
  result.your_skills = cleanSkills(result.your_skills);
  result.top_required_skills = cleanSkills(result.top_required_skills);
  result.missing_skills = cleanSkills(result.missing_skills);

  return (
    <ResultContainer>
      <Header>
        <h2>Job Readiness Report</h2>
        <div className="company-name">Analysis for {result.company}</div>
      </Header>

      <ResultCard ready={result.is_ready}>
        <h3>
          {result.is_ready ? (
            <>
              <FaCheckCircle /> You're Job Ready!
            </>
          ) : (
            <>
              <FaTimesCircle /> Preparation Needed
            </>
          )}
        </h3>
        
        <div className="match-percentage">
          {result.match_percentage}% Skill Match
        </div>
        
        <p className="result-message">
          {result.is_ready
            ? `Congratulations! ${result.explanation || "Your skills fully meet the requirements"} at ${result.company}.`
            : `You're ${100 - result.match_percentage}% away from being job-ready at ${result.company}. Focus on the recommended skills below.`}
        </p>
      </ResultCard>

      {result.is_ready && (
        <SuccessCelebration>
          <FaRegSmileBeam />
          <div>
            <h4>Excellent Match!</h4>
            <p>
              You have all the skills {result.company} is looking for. 
              {result.explanation && ` ${result.explanation}`} Consider applying for positions now!
            </p>
          </div>
        </SuccessCelebration>
      )}

      <SkillsSection>
        <h4><FaRegLightbulb /> Your Skills Assessment</h4>
        {result.top_required_skills.length > 0 ? (
          <SkillList>
            {result.top_required_skills.map((skill, index) => (
              <SkillItem 
                key={index} 
                known={result.your_skills.some(yourSkill => 
                  yourSkill.toLowerCase().includes(skill.toLowerCase()) || 
                  skill.toLowerCase().includes(yourSkill.toLowerCase())
                )}
              >
                {result.your_skills.some(yourSkill => 
                  yourSkill.toLowerCase().includes(skill.toLowerCase()) || 
                  skill.toLowerCase().includes(yourSkill.toLowerCase())
                ) ? <FaCheckCircle /> : <FaTimesCircle />}
                <span>{skill}</span>
              </SkillItem>
            ))}
          </SkillList>
        ) : (
          <p>No specific skills requirements available for comparison.</p>
        )}
      </SkillsSection>

      {!result.is_ready && result.missing_skills.length > 0 && (
        <RecommendationSection>
          <h4><FaArrowRight /> Recommended Skills to Learn</h4>
          <ul>
            {result.missing_skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <p>
            Mastering these {result.missing_skills.length} skills will significantly increase your chances 
            of getting hired at {result.company}.
          </p>
        </RecommendationSection>
      )}

      <NextSteps>
        <h4>Next Steps</h4>
        {result.is_ready ? (
          <>
            <p>✓ Update your resume highlighting these matched skills</p>
            <p>✓ Search for job openings at {result.company}</p>
            <p>✓ Prepare for interviews to showcase your skills</p>
            {result.explanation && <p>✓ {result.explanation}</p>}
          </>
        ) : (
          <>
            <p>✓ Create a learning plan for the missing skills</p>
            <p>✓ Practice these skills through projects and exercises</p>
            <p>✓ Re-assess your readiness after skill development</p>
          </>
        )}
      </NextSteps>
    </ResultContainer>
  );
};

export default Prediction;