import React, { useState } from "react";
import { motion } from "framer-motion";

const technicalQuestions = [
  {
    question: "What is the time complexity of binary search in a sorted array?",
    options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    answer: "O(log n)",
  },
  {
    question: "Which sorting algorithm has the best average case time complexity?",
    options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Insertion Sort"],
    answer: "Merge Sort",
  },
  {
    question: "What is a deadlock in Operating Systems?",
    options: [
      "A situation where processes execute without stopping",
      "A situation where processes wait for resources indefinitely",
      "A scheduling algorithm",
      "A type of memory allocation",
    ],
    answer: "A situation where processes wait for resources indefinitely",
  },
  {
    question: "Which of the following is a non-relational database?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    answer: "MongoDB",
  },
  {
    question: "Which layer in the OSI model is responsible for encryption?",
    options: [
      "Network Layer",
      "Transport Layer",
      "Session Layer",
      "Presentation Layer",
    ],
    answer: "Presentation Layer",
  },
  {
    question: "What is the primary key in a database?",
    options: [
      "A unique identifier for a record",
      "A foreign key from another table",
      "A key used for encryption",
      "A key to access system files",
    ],
    answer: "A unique identifier for a record",
  },
  {
    question: "Which data structure is used for implementing recursion?",
    options: ["Queue", "Stack", "Linked List", "Graph"],
    answer: "Stack",
  },
  {
    question: "Which principle is NOT a part of Object-Oriented Programming?",
    options: ["Encapsulation", "Inheritance", "Normalization", "Polymorphism"],
    answer: "Normalization",
  },
  {
    question: "Which SQL command is used to retrieve data from a database?",
    options: ["SELECT", "INSERT", "UPDATE", "DELETE"],
    answer: "SELECT",
  },
  {
    question: "What is the default port number for HTTP?",
    options: ["21", "22", "80", "443"],
    answer: "80",
  },
];

const Technical = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleOptionChange = (index, option) => {
    setUserAnswers((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const handleSubmit = () => {
    let newScore = 0;
    technicalQuestions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen p-8">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Technical Round - MCQ Test
        </motion.h1>

        {/* Questions */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {technicalQuestions.map((q, index) => (
            <motion.div
              key={index}
              className="mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h5 className="font-bold text-lg text-emerald-700">
                {index + 1}. {q.question}
              </h5>
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center mt-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="mr-2"
                  />
                  <label className="text-gray-900">{option}</label>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          className="mt-6 bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
        >
          Submit
        </motion.button>

        {/* Score Display */}
        {score !== null && (
          <motion.div
            className="mt-6 bg-emerald-100 text-emerald-900 p-4 rounded-lg shadow-md text-center font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your Score: {score} / {technicalQuestions.length}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Technical;
