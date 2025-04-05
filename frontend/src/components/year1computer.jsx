import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const year1computer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);  // user is { user: { _id: "...", ... } }
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    console.log("Full auth state:", { user });
    console.log("User data:", user);
    if (!user || !user.user || !user.user._id) {  // Check nested user.user._id
      console.error("User or user.user._id is undefined");
      alert("Error: Please log in to continue");
      navigate('/login');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5002/predict/${user.user._id}`, {  // Use user.user._id
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Prediction failed');
      }

      const result = await response.json();
      navigate('/Prediction', { state: { result } });
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !user.user || !user.user._id) {  // Check nested user.user._id
    return (
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-16 px-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Placement Readiness Program</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Please log in to assess your placement readiness.
        </p>
        <button
          className="mt-6 bg-yellow-400 text-blue-800 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </section>
    );
  }
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-16 px-6 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Placement Readiness Program</h1>
      <p className="text-lg max-w-2xl mx-auto mb-6">
        Empowering 1st Year Engineering Students with skills, internships, and resources for a successful career.
      </p>
      <button 
        className={`mt-6 bg-yellow-400 text-blue-800 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300 ${
          isLoading ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        onClick={handleGetStarted}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </span>
        ) : (
          'Get Started'
        )}
      </button>
    </section>
      <section className="py-12 px-6 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Internships Oppurtunities </h2>

      {/* Internship Opportunities Section */}
      <div class="flex flex-wrap justify-center gap-6 p-4">
    <div class="w-80 h-82 p-6 border rounded-xl shadow-lg bg-white">
        <h2 class="text-2xl font-bold mb-2">Internship Role</h2>
        <p class="text-gray-600"><strong>About:</strong> Brief description of the internship.</p>
        <p class="text-gray-600"><strong>Duration:</strong> 3 months</p>
        <p class="text-gray-600"><strong>Date:</strong> June - August 2025</p>
        <a href="#" class="mt-9 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-center">
            Register
        </a>
    </div>

    <div class="w-80 h-82 p-6 border rounded-xl shadow-lg bg-white">
        <h2 class="text-2xl font-bold mb-2">Internship Role</h2>
        <p class="text-gray-600"><strong>About:</strong> Brief description of the internship.</p>
        <p class="text-gray-600"><strong>Duration:</strong> 6 months</p>
        <p class="text-gray-600"><strong>Date:</strong> July - December 2025</p>
        <a href="#" class="mt-9 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-center">
            Register
        </a>
    </div>

    <div class="w-80 h-82 p-6 border rounded-xl shadow-lg bg-white">
        <h2 class="text-2xl font-bold mb-2">Internship Role</h2>
        <p class="text-gray-600"><strong>About:</strong> Brief description of the internship.</p>
        <p class="text-gray-600"><strong>Duration:</strong> 2 months</p>
        <p class="text-gray-600"><strong>Date:</strong> May - June 2025</p>
        <a href="#" class="mt-9 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-center">
            Register
        </a>
    </div>
</div>
</section>



      {/* Skill Development Programs Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Skill Development Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-xl mx-auto">
          {[
            {
              title: "Weekly Bootcamps",
              description: "Join us every Friday for hands-on workshops covering essential technical skills.",
            },
            {
              title: "Soft Skills Workshops",
              description: "Enhance your communication and interview skills with our expert-led sessions.",
            },
            {
              title: "Technical Certifications",
              description: "Get certified in trending technologies through our partnership with online platforms.",
            },
          ].map((program, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration=300">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{program.title}</h3>
              <p>{program.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Placement Preparation Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Your Path to Placement Success</h2>
        <ol className="list-decimal list-inside space-y-4 max-w-xl mx-auto text-lg">
          <li><strong>Aptitude Tests:</strong> Prepare with resources provided by the college.</li>
          <li><strong>Coding Challenges:</strong> Participate in coding competitions to sharpen your skills.</li>
          <li><strong>Mock Interviews:</strong> Engage in mock interviews to build confidence.</li>
          <li><strong>Resume Building:</strong> Attend workshops to create impactful resumes.</li>
        </ol>
      </section>

      {/* Call-to-Actions Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-400 to-yellow-300 text-center rounded-lg shadow-lg mt-10">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Ready to Take the Next Step?</h2>
        <p className="text-lg mb-6">
          Join our programs, explore internships, and prepare for placements with expert guidance.
        </p>
        <button className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-500 transition duration=300">
          Start Preparing Now
        </button>
      </section>
    </div>
  );
    
  
}

export default year1computer
