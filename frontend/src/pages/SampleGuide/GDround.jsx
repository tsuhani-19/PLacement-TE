import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const topics = [
  {
    title: "Artificial Intelligence - Boon or Bane?",
    pros: "Enhances efficiency, Automates tasks, Reduces errors",
    cons: "Job displacement, Ethical concerns, Security risks",
    balanced: "AI is a powerful tool that, if regulated well, can benefit humanity greatly."
  },
  {
    title: "Work From Home vs. Work From Office",
    pros: "Flexibility, No commute, Work-life balance",
    cons: "Less collaboration, Increased distractions, Mental health concerns",
    balanced: "Hybrid work models seem to be the best of both worlds."
  },
  {
    title: "Impact of Social Media on Youth",
    pros: "Connectivity, Awareness, Career opportunities",
    cons: "Mental health issues, Fake news, Privacy concerns",
    balanced: "Social media is powerful but requires responsible usage."
  },
  {
    title: "Is India Ready for Electric Vehicles?",
    pros: "Eco-friendly, Reduces fuel dependency, Low maintenance",
    cons: "Expensive infrastructure, Limited charging stations, Battery disposal issues",
    balanced: "With government incentives, EV adoption will rise in the coming years."
  }
];

const GDround = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen p-8 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
          Group Discussion (GD) Round Preparation
        </h1>

        {/* GD Topics Section */}
        <div className="space-y-6">
          {topics.map((topic, index) => (
            <motion.div
              key={index}
              className="bg-white text-emerald-800 rounded-lg shadow-lg p-4 cursor-pointer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{topic.title}</h2>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <p><strong>Pros:</strong> {topic.pros}</p>
                  <p><strong>Cons:</strong> {topic.cons}</p>
                  <p><strong>Balanced View:</strong> {topic.balanced}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* GD Tips Section */}
        <div className="mt-12 bg-white text-emerald-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Do’s & Don'ts in GD</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-emerald-700 font-bold">✅ Do’s</h3>
              <ul className="list-disc pl-5">
                <li>Stay confident and maintain good posture.</li>
                <li>Listen actively and respect others' opinions.</li>
                <li>Use data and facts to support your points.</li>
                <li>Be clear and concise in your speech.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-red-700 font-bold">❌ Don'ts</h3>
              <ul className="list-disc pl-5">
                <li>Don’t interrupt others while they speak.</li>
                <li>Don’t dominate or be aggressive.</li>
                <li>Don’t deviate from the topic.</li>
                <li>Don’t use filler words like "um," "like," too much.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDround;