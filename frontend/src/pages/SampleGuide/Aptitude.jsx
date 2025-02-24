import React, { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    question: "What is the next number in the series? 2, 6, 12, 20, 30, ?",
    options: ["36", "40", "42", "50"],
    answer: "42",
  },
  {
    question: "A train 240 m long is running at a speed of 72 km/hr. How much time will it take to pass a platform 260 m long?",
    options: ["10 sec", "20 sec", "25 sec", "30 sec"],
    answer: "20 sec",
  },
  {
    question: "If the sum of two numbers is 30 and their product is 221, what are the numbers?",
    options: ["11 and 19", "13 and 17", "15 and 15", "10 and 20"],
    answer: "13 and 17",
  },
  {
    question: "What is the missing term in the sequence? 3, 9, 27, ?, 243",
    options: ["54", "81", "108", "162"],
    answer: "81",
  },
];

const Aptitude = () => {
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
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen p-8">
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
          Aptitude Test
        </h1>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {questions.map((q, index) => (
            <motion.div
              key={index}
              className="mb-6 p-4 border border-emerald-300 rounded-lg shadow-md bg-emerald-50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h5 className="text-lg font-bold text-emerald-800">
                {index + 1}. {q.question}
              </h5>
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="block mt-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={userAnswers[index] === option}
                    onChange={() => handleOptionChange(index, option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </motion.div>
          ))}

          <motion.button
            onClick={handleSubmit}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Submit
          </motion.button>

          {score !== null && (
            <motion.div
              className="mt-6 p-4 text-lg font-semibold text-center bg-emerald-200 text-emerald-900 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Your Score: {score} / {questions.length}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Aptitude;
