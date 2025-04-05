import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const isroMaterials = [
  { title: "Official Website", link: "https://www.isro.gov.in/" },
  { title: "Previous Year Papers", link: "https://www.isro.gov.in/careers" },
  { title: "Mock Tests", link: "https://testseries.isroexam.com/" },
  { title: "Study Materials", link: "https://nptel.ac.in/courses" },
  { title: "Reference Books", link: "https://gate.iitk.ac.in/books" },
];

const IsroExam = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
          ISRO Scientist Exam Preparation
        </h1>

        {/* Study Materials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {isroMaterials.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-white rounded-lg shadow-lg text-center text-indigo-800 font-semibold transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.title}
            </motion.a>
          ))}
        </div>

        {/* Preparation Guidance */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Preparation Guide</h2>
          <ul className="list-disc pl-5 text-indigo-900">
            <li>Understand the exam pattern and syllabus.</li>
            <li>Practice previous year question papers.</li>
            <li>Focus on technical subjects from Electronics, Mechanical, CS, etc.</li>
            <li>Improve problem-solving speed with mock tests.</li>
            <li>Stay updated with ISRO's latest projects and developments.</li>
          </ul>
        </div>

        {/* Swiper for Important Dates */}
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-300 mb-6">ISRO 2025 Important Dates</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-indigo-700 font-bold">Application Start Date</h3>
                <p className="text-gray-600">April 2025</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-indigo-700 font-bold">Exam Date</h3>
                <p className="text-gray-600">June 2025</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-indigo-700 font-bold">Result Declaration</h3>
                <p className="text-gray-600">August 2025</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default IsroExam;
