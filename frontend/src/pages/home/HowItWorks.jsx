import React from "react";

const HowItWorks = () => {
  return (
    <div className="w-full py-10 bg-white flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">Let’s See How it Works</h2>

      {/* Steps Section */}
      <div className="flex justify-center gap-20 mb-28"> {/* Increased margin-bottom */}
        {[
          { step: "1", title: "Profile Creation", desc: "Create Your Profile" },
          { step: "2", title: "Placement Ready Prediction", desc: "Assess Your Skills" },
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

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 px-4 max-w-6xl">
        {[
          {
            icon: "↔️",
            title: "Personalized Career Guidance",
            desc: "Get personalized advice based on your skills and interests, guiding you to internships, placements, and higher studies."
          },
          {
            icon: "📋",
            title: "Placement Ready Prediction",
            desc: "Ready to know if you are placement ready or not."
          },
          {
            icon: "⚙️",
            title: "Skill Development Workshops",
            desc: "Explore various courses and workshops designed to bridge the gap between your current skills and placement demands."
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
