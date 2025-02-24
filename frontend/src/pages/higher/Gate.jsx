import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const materials = [
 
    { title: "Previous Year Papers", link: "https://gate.iitkgp.ac.in/" },
    { title: "Subject-wise Notes", link: "https://www.nptel.ac.in/" },
    { title: "Mock Tests", link: "https://www.testbook.com/gate-test-series" },
    { title: "Reference Books", link: "https://www.amazon.in/s?k=gate+books" },
    { title: "Online Courses", link: "https://www.unacademy.com/explore/gate" },
    { title: "Important Formulas", link: "https://gradeup.co/formula-notes-for-gate-exam-i" },
  
  
];

const Gate = () => {
  return (
    <div className="bg-gradient-to-r from-green-800 to-emerald-900 min-h-screen p-8">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
          GATE Exam Preparation
        </h1>
        
        {/* Study Materials Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {materials.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="p-6 bg-white rounded-lg shadow-lg text-center text-emerald-800 font-semibold transition transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.title}
            </motion.a>
          ))}
        </div>
        
        {/* GATE Preparation Guidance */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-3xl font-bold text-emerald-700 mb-4">Preparation Guide</h2>
          <ul className="list-disc pl-5 text-emerald-900">
            <li>Understand the syllabus and exam pattern thoroughly.</li>
            <li>Create a structured study plan and allocate time for each subject.</li>
            <li>Practice previous years' papers and take regular mock tests.</li>
            <li>Revise important formulas and concepts regularly.</li>
            <li>Stay updated with notifications and exam dates.</li>
          </ul>
        </div>
        
        {/* Swiper for Important Dates and Events */}
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-300 mb-6">GATE 2025 Important Dates</h2>
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
                <h3 className="text-emerald-700 font-bold">Application Start Date</h3>
                <p className="text-gray-600">September 2024</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-emerald-700 font-bold">Admit Card Release</h3>
                <p className="text-gray-600">January 2025</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="p-6 bg-white rounded-lg shadow-md text-center">
                <h3 className="text-emerald-700 font-bold">Exam Date</h3>
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
