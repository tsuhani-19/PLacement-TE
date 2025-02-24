import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gate from './Gate.jsx';

const exams = [
  {
    name: 'GATE Exam',
    description: 'Prepare for the Graduate Aptitude Test in Engineering (GATE) to pursue a Master\'s degree in Engineering or secure top PSU jobs.',
    duration: '3 Hours',
    link: gate,
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=GATE+Exam',
  },
  {
    name: 'GRE Exam',
    description: 'The Graduate Record Examination (GRE) is essential for students applying to graduate schools abroad.',
    duration: '3 Hours 45 Minutes',
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=GRE+Exam',
  },
  {
    name: 'Ph.D. Exams',
    description: 'Prepare for entrance exams like CSIR NET and UGC NET to embark on a research career and join top universities.',
    duration: '3-5 Years (Program Duration)',
    image: 'https://via.placeholder.com/150/33A0FF/FFFFFF?text=PhD+Exam',
  },
  {
    name: 'Professional Certifications',
    description: 'Enhance your skills with certifications in areas like networking, project management, and data science.',
    duration: '6 Months - 1 Year',
    image: 'https://via.placeholder.com/150/33A0FF/FFFFFF?text=Certifications+Exam',
  },
  {
    name: 'GMAT Exam',
    description: 'Prepare for the Graduate Management Admission Test (GMAT) to secure admission in top global business schools.',
    duration: '3 Hours 30 Minutes',
    image: 'https://via.placeholder.com/150/FF33AA/FFFFFF?text=GMAT+Exam',
  },
];

const HigherStudies = () => {
  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500"
        >
          Explore Higher Studies Opportunities
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-xl text-center text-gray-200 mb-12"
        >
          Choose from a range of exams that pave your way for higher studies and rewarding careers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {exams.map((exam, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-gray-800 text-gray-100 shadow-2xl rounded-lg overflow-hidden hover:shadow-2xl transform transition duration-300 cursor-pointer"
            >
              {exam.link ? (
                <Link to={exam.link}>
                  <ExamCard exam={exam} />
                </Link>
              ) : (
                <ExamCard exam={exam} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ExamCard = ({ exam }) => (
  <>
    <img src={exam.image} alt={exam.name} className="w-full h-48 object-cover rounded-t-lg" />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-white mb-4">{exam.name}</h2>
      <p className="text-gray-300 mb-4">{exam.description}</p>
      <p className="text-sm text-gray-400">
        <span className="font-bold text-yellow-400">Duration: </span>
        {exam.duration}
      </p>
    </div>
  </>
);

export default HigherStudies;
