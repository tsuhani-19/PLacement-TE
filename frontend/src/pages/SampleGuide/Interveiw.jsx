import React from "react";
import { motion } from "framer-motion";

const interviewTips = [
  "Research the company and role thoroughly.",
  "Practice answering common HR and technical questions.",
  "Be confident and maintain good body language.",
  "Prepare a strong self-introduction.",
  "Always have a few questions ready for the interviewer.",
  "Dress appropriately for the interview.",
  "Be clear and concise in your answers.",
  "Use real-life examples to demonstrate your skills.",
  "Stay calm and composed, even under pressure.",
  "Follow up with a thank-you email after the interview."
];

const hrQuestions = [
  "Tell me about yourself.",
  "What are your strengths and weaknesses?",
  "Where do you see yourself in five years?",
  "Why should we hire you?",
  "Describe a time you handled a difficult situation.",
  "What do you know about our company?",
  "Why do you want this job?",
  "Tell me about a time you worked in a team.",
  "Do you have any questions for us?"
];

const technicalQuestions = [
  "Explain Object-Oriented Programming principles.",
  "What is the difference between HTTP and HTTPS?",
  "What are SQL Joins and their types?",
  "How does memory management work in JavaScript?",
  "What are the different types of databases?",
  "Explain the concept of multithreading.",
  "What are the SOLID principles in software development?",
  "Describe the differences between REST and GraphQL.",
  "How does garbage collection work in Java?"
];

const Interview = () => {
  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen p-8">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
          Interview Preparation Guide
        </h1>

        {/* Tips Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">Top Interview Tips</h2>
          <ul className="list-disc pl-5 text-emerald-900">
            {interviewTips.map((tip, index) => (
              <motion.li
                key={index}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {tip}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* HR Questions */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">Common HR Interview Questions</h2>
          <ul className="list-disc pl-5 text-emerald-900">
            {hrQuestions.map((question, index) => (
              <motion.li
                key={index}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {question}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technical Questions */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">Common Technical Interview Questions</h2>
          <ul className="list-disc pl-5 text-emerald-900">
            {technicalQuestions.map((question, index) => (
              <motion.li
                key={index}
                className="mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {question}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Interview;
