import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const materials = [
  { title: "Previous Year Papers", link: "https://gateoverflow.in/" },
  { title: "Subject-wise Notes", link: "https://nptel.ac.in/courses" },
  { title: "Mock Tests", link: "https://freecomputerbooks.com/" },
  { title: "Reference Books", link: "https://freecomputerbooks.com/gate-books.html" },
  { title: "Online Courses", link: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/" },
  { title: "Important Formulas", link: "https://www.careers360.com/" },
];

const Gate = () => {
  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-8 text-gray-900"
        >
          GATE Exam Preparation
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-lg text-center text-gray-600 mb-12"
        >
          Access free resources and guidance to ace your GATE exam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {materials.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white rounded-lg shadow-md text-center text-gray-900 font-semibold border border-gray-200 transform transition duration-300 hover:shadow-xl"
            >
              {item.title}
            </motion.a>
          ))}
        </motion.div>

        <div className="bg-white p-6 rounded-lg shadow-md mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparation Guide</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>Understand the syllabus and exam pattern.</li>
            <li>Create a structured study plan and stick to it.</li>
            <li>Practice previous years' papers and attempt mock tests.</li>
            <li>Revise key formulas and concepts regularly.</li>
            <li>Stay updated with notifications and exam dates.</li>
          </ul>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">GATE 2025 Important Dates</h2>
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
                <h3 className="text-gray-900 font-bold">Application Start Date</h3>
                <p className="text-gray-600">September 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-gray-900 font-bold">Admit Card Release</h3>
                <p className="text-gray-600">January 2025</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-gray-900 font-bold">Exam Date</h3>
                <p className="text-gray-600">February 2025</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Gate;