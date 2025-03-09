import React from "react";
import { motion } from "framer-motion";

const entrepreneurshipPrograms = [
  {
    title: "Startup Incubation",
    description:
      "Get mentorship, funding, and resources to turn your business idea into a successful startup.",
    image: "https://via.placeholder.com/300/FF5733/FFFFFF?text=Incubation",
  },
  {
    title: "Funding Opportunities",
    description:
      "Explore venture capital, angel investors, and government grants to fuel your startup growth.",
    image: "https://via.placeholder.com/300/33FF57/FFFFFF?text=Funding",
  },
  {
    title: "Workshops & Seminars",
    description:
      "Learn from successful entrepreneurs and industry experts through hands-on workshops and talks.",
    image: "https://via.placeholder.com/300/3380FF/FFFFFF?text=Workshops",
  },
  {
    title: "Networking Events",
    description:
      "Connect with like-minded entrepreneurs, investors, and mentors to expand your startup network.",
    image: "https://via.placeholder.com/300/FF33AA/FFFFFF?text=Networking",
  },
];

const Entrepreneur = () => {
  return (
    <div className="bg-white min-h-screen py-12 px-6">
      <div className="container mx-auto">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-600"
        >
          Entrepreneurship & Startups
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-xl text-center text-gray-700 mb-12"
        >
          Explore various programs and opportunities to kickstart your entrepreneurial journey.
        </motion.p>

        {/* Entrepreneurship Programs Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {entrepreneurshipPrograms.map((program, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden transform transition duration-300"
            >
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  {program.title}
                </h2>
                <p className="text-gray-600">{program.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Entrepreneur;
