import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import iit from "../../assets/Iit.jpg";
import iit2 from "../../assets/iit2.jpg";

const exams = [
  {
    name: "GATE Exam",
    description:
      "Prepare for the Graduate Aptitude Test in Engineering (GATE) to pursue a Master's degree in Engineering or secure top PSU jobs.",
    duration: "3 Hours",
    link: "/HigherStudies/gate",  // ✅ Fixed link
  },
  {
    name: "IES Exam",
    description:
      "Indian Engineering Services (IES) exam offers prestigious government jobs in various engineering fields.",
    duration: "2 Stages (Prelims & Mains) + Interview",
    link: "/HigherStudies/IES",  // ✅ Fixed link
  },
  {
    name: "ISRO Exam",
    description:
      "Join the Indian Space Research Organisation (ISRO) by clearing the ISRO Scientist/Engineer exam.",
    duration: "2-3 Hours",
    link: "/HigherStudies/Isro",  // ✅ Fixed link
  },
  {
    name: "BARC Exam",
    description:
      "Crack the Bhabha Atomic Research Centre (BARC) exam to work in nuclear research and related fields.",
    duration: "2-3 Hours",
    link: "/HigherStudies/BARC",  // ✅ Fixed link
  },
  {
    name: "CAT Exam",
    description:
      "Prepare for the Common Admission Test (CAT) to secure admission in top business schools in India.",
    duration: "3 Hours",
    link: "/HigherStudies/CatExam",  // ✅ Fixed link
  },
];

const HigherStudies = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-8 text-gray-900"
        >
          Explore Higher Studies Opportunities
        </motion.h1>

    

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {exams.map((exam, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white text-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transform transition duration-300 border border-gray-200"
            >
              <Link to={exam.link}>
                <ExamCard exam={exam} index={index} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ExamCard = ({ exam, index }) => (
  <>
    <img
      src={index % 2 === 0 ? iit : iit2} // Alternate images based on index
      alt={exam.name}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{exam.name}</h2>
      <p className="text-gray-600 mb-4">{exam.description}</p>
      <p className="text-sm text-gray-500">
        <span className="font-bold text-gray-700">Duration: </span>
        {exam.duration}
      </p>
    </div>
  </>
);

export default HigherStudies;
