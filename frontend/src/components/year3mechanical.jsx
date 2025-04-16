import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from "axios";

const year3mechanical = () => {
  // ===== PLACEMENT PREDICTION CODE =====
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (!user?.user?._id) {
      alert("Please log in to continue");
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5002/predict/${user.user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Prediction failed');
      const result = await response.json();
      navigate('/Prediction', { state: { result } });
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // ===== FRIEND'S INTERNSHIP CODE =====
  const [showPanel, setShowPanel] = useState(false);
  const [internships, setInternships] = useState([]);
  const [internshipData, setInternshipData] = useState({
    title: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
    password: "",
  });

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/internships");
        setInternships(response.data.internships);
      } catch (error) {
        console.error("Error fetching internships:", error.response?.data || error.message);
      }
    };
    fetchInternships();
  }, []);

  const handleInputChange = (e) => {
    setInternshipData({ ...internshipData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!internshipData.password) {
        alert("Admin password is required");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/internships/add",
        {
          ...internshipData,
          startDate: internshipData.startDate || new Date(),
          endDate: internshipData.endDate || new Date()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        setInternships([...internships, response.data.internship]);
        alert("Internship Added Successfully!");
        setShowPanel(false);
        setInternshipData({ 
          title: "", 
          company: "", 
          description: "", 
          startDate: "", 
          endDate: "", 
          password: "" 
        });
      }
    } catch (error) {
      console.error("Full error:", error.response?.data || error);
      alert(`Error: ${error.response?.data?.message || "Failed to add internship"}`);
    }
  };

  // ===== RENDER LOGIC =====
  if (!user?.user?._id) {
    return (
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-center py-16 px-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Mechanical Placement Readiness - Year 3</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Please log in to assess your placement readiness for mechanical engineering.
        </p>
        <button
          className="mt-6 bg-yellow-400 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300"
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
      </section>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800 font-sans relative">
      {/* Placement Prediction Section */}
      <section className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-center py-16 px-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Mechanical Placement Readiness - Year 3</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Prepare for your mechanical engineering placement with advanced skills, internships, and industry insights.
        </p>
        <button 
          className={`mt-6 bg-yellow-400 text-gray-800 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300 ${
            isLoading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          onClick={handleGetStarted}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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

      {/* Internship Opportunities Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Mechanical Internship Opportunities</h2>
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setShowPanel(true)} 
            className="bg-gray-700 text-white py-2 px-4 rounded-full shadow-md hover:bg-gray-600 transition"
          >
            Add Internship
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-6 p-4">
          {internships.map((internship, index) => (
            <div key={index} className="w-80 h-82 p-6 border rounded-xl shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-2">{internship.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {internship.company}</p>
              <p className="text-gray-600"><strong>Description:</strong> {internship.description}</p>
              <p className="text-gray-600"><strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>End Date:</strong> {new Date(internship.endDate).toLocaleDateString()}</p>
              <a href="#" className="mt-4 inline-block px-6 py-3 bg-gray-700 text-white rounded-lg text-center hover:bg-gray-600">
                Register
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Hub Section */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Learning Hub for Mechanical Engineers - Year 3</h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Enhance your mechanical engineering skills with advanced tools, projects, and career strategies for your third year.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resource Card 1 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Master CAD & Simulation</h3>
            <p className="text-gray-600 mb-4">
              Deepen your expertise in AutoCAD, SolidWorks, and ANSYS for design and analysis.
            </p>
            <a
              href="https://www.solidworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-semibold hover:underline"
            >
              Explore SolidWorks →
            </a>
          </div>

          {/* Resource Card 2 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Build Mechanical Projects</h3>
            <p className="text-gray-600 mb-4">
              Develop projects like a robotic arm or engine prototype to showcase your skills.
            </p>
            <a
              href="https://www.grabcad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-semibold hover:underline"
            >
              Start on GrabCAD →
            </a>
          </div>

          {/* Resource Card 3 */}
          <div className="p-6 bg-gray-50 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Industry Preparation</h3>
            <p className="text-gray-600 mb-4">
              Learn about manufacturing processes, IoT in mechanics, and network with industry professionals.
            </p>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 font-semibold hover:underline"
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-10 text-center">
          <p className="text-xl italic text-gray-700">
            "Engineering is the art of directing the great sources of power in nature for the use and convenience of man." – Thomas Tredgold
          </p>
        </div>
      </section>

      {/* Internship Form Panel */}
      {showPanel && (
        <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0">
          <h2 className="text-2xl font-bold mb-4">Add Mechanical Internship</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
  <input
    type="text"
    name="title"
    placeholder="Internship Title"
    value={internshipData.title}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <input
    type="text"
    name="company"
    placeholder="Company Name"
    value={internshipData.company}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  {/* 🆕 Branch Input */}
  <input
    type="text"
    name="branch"
    placeholder="Branch (e.g. Mechanical, Computer, etc.)"
    value={internshipData.branch}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <textarea
    name="description"
    placeholder="Internship Description"
    value={internshipData.description}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <input
    type="date"
    name="startDate"
    value={internshipData.startDate}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <input
    type="date"
    name="endDate"
    value={internshipData.endDate}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <input
    type="password"
    name="password"
    placeholder="Admin Password"
    value={internshipData.password}
    onChange={handleInputChange}
    className="p-2 border rounded"
    required
  />

  <div className="flex justify-between">
    <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-500 transition">
      Submit
    </button>
    <button type="button" onClick={() => setShowPanel(false)} className="bg-red-600 text-white py-2 px-4 rounded shadow-md hover:bg-red-500 transition">
      Cancel
    </button>
  </div>
</form>

        </div>
      )}
    </div>
  );
};

export default year3mechanical;