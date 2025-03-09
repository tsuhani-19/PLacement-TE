import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import google from "../assets/google.png"
import amazon from "../assets/amazon1.png"
import micro from "../assets/micro.png"

// Company data with logos
const companies = [
  { name: "Google", logo: google },
  { name: "Amazon", logo: amazon },
  { name: "Microsoft", logo: micro },
  { name: "IBM", logo: google },
  { name: "TCS", logo: google },
  { name: "Infosys", logo: google },
  { name: "Wipro", logo: google },
];

const Placement = () => {
  const [selectedCompany, setSelectedCompany] = useState("");

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between p-8">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center mb-12 text-gray-900"
        >
          Placement Opportunities
        </motion.h1>

        {/* Search Bar Section */}
        <div className="flex justify-center mb-12">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <label htmlFor="companySearch" className="text-lg font-medium text-gray-700">
              Search for a Company
            </label>
            <div className="relative">
              <select
                id="companySearch"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 appearance-none"
              >
                <option value="" disabled>
                  Select a company
                </option>
                {companies.map((company, index) => (
                  <option key={index} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selection Stages */}
            {selectedCompany && (
              <div className="mt-6 space-y-4">
                <Link to="aptitude-test">
                  <div className="p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
                    Aptitude Test
                  </div>
                </Link>
                <Link to="technical-round">
                  <div className="p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
                    Technical Round
                  </div>
                </Link>
                <Link to="gd-round">
                  <div className="p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
                    GD Round
                  </div>
                </Link>
                <Link to="interview">
                  <div className="p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition">
                    Interview
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Company Logos Carousel */}
        <div className="w-full max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="w-24 h-24 bg-white rounded-full shadow-md flex justify-center items-center mx-auto border border-gray-200"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img src={company.logo} alt={company.name} className="w-16 h-16 object-contain" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Placement;
