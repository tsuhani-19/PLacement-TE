import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full py-10 bg-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Let’s See How it Works</h2>

      <div className="flex justify-center gap-8 mb-10">
        {[
          { step: "1", title: "Profile Creation", desc: "Create Your Profile" },
          { step: "2", title: "Competency Diagnostic Tool", desc: "Assess Your Skills" },
          { step: "3", title: "Recommendations", desc: "Get Personalized Recommendations" }
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-300 text-black font-bold rounded-full flex items-center justify-center">
              {item.step}
            </div>
            <h3 className="font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-600 italic">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-5xl">
        {[
          {
            icon: "↔️",
            title: "Personalized Career Guidance",
            desc: "Get personalized advice based on your skills and interests, guiding you to internships, placements, and higher studies."
          },
          {
            icon: "📋",
            title: "Curated Internship Opportunities",
            desc: "Access a comprehensive list of internship opportunities that align with your academic background."
          },
          {
            icon: "⚙️",
            title: "Skill Development Workshops",
            desc: "Explore various courses and workshops designed to bridge the gap between your current skills and industry demands."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl">{item.icon}</div>
            <h3 className="text-lg font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-600 italic mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
