import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const catMaterials = [
  { title: "Previous Year Papers", link: "https://iimcat.ac.in" },
  { title: "Subject-wise Notes", link: "https://nptel.ac.in/courses" },
  { title: "Mock Tests", link: "https://www.oliveboard.in/free-cat-mock-test/" },
  { title: "Reference Books", link: "https://free-management-ebooks.com/" },
  { title: "Online Courses", link: "https://ocw.mit.edu/courses/sloan-school-of-management/" },
];

const CatExam = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
          CAT Exam Preparation
        </h1>

        {/* Study Materials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {catMaterials.map((item, index) => (
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
            <li>Improve speed and accuracy with mock tests.</li>
            <li>Work on verbal ability and logical reasoning.</li>
            <li>Develop a strategy for solving questions efficiently.</li>
          </ul>
        </div>

        {/* Swiper for Important Dates */}
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-300 mb-6">CAT 2025 Important Dates</h2>
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
                <p className="text-gray-600">August 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-indigo-700 font-bold">Admit Card Release</h3>
                <p className="text-gray-600">October 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-indigo-700 font-bold">Exam Date</h3>
                <p className="text-gray-600">November 2024</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CatExam;
