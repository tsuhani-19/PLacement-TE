import React, { useState, useEffect } from "react";
import axios from "axios";

const Year1Computer = () => {
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

  // Fetch Internships from Backend
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/internships/");
        setInternships(response.data.internships);
      } catch (error) {
        console.error("Error fetching internships:", error);
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
      const response = await axios.post("http://localhost:5001/api/internships/add", internshipData);

      if (response.data.success) {
        setInternships([...internships, response.data.internship]); // Add new internship to UI
        alert("Internship Added Successfully!");
        setShowPanel(false);
        setInternshipData({ title: "", company: "", description: "", startDate: "", endDate: "", password: "" });
      } else {
        alert("Failed to add internship: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding internship:", error);
      alert("Error adding internship. Please check your input.");
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center py-16 px-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Placement Readiness Program</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6">
          Empowering 3rd Year Engineering Students with skills, internships, and resources for a successful career.
        </p>
        <button className="mt-6 bg-yellow-400 text-blue-800 font-semibold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-300">
          Get Started
        </button>
      </section>

      {/* Internship Opportunities Section */}
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Internship Opportunities</h2>

        {/* Centered "Add Internship" Button */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => setShowPanel(true)} 
            className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-500 transition"
          >
            Add Internship
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 p-4">
          {/* Dynamically Display Internships */}
          {internships.map((internship, index) => (
            <div key={index} className="w-80 h-82 p-6 border rounded-xl shadow-lg bg-white">
              <h2 className="text-2xl font-bold mb-2">{internship.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {internship.company}</p>
              <p className="text-gray-600"><strong>Description:</strong> {internship.description}</p>
              <p className="text-gray-600"><strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>End Date:</strong> {new Date(internship.endDate).toLocaleDateString()}</p>
              <a href="#" className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-center">
                Register
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Right-Side Panel (Form for Adding Internship) */}
      {showPanel && (
        <div className="fixed right-0 top-0 w-96 h-full bg-white shadow-lg p-6 transition-transform transform translate-x-0">
          <h2 className="text-2xl font-bold mb-4">Add Internship</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input type="text" name="title" placeholder="Internship Title" value={internshipData.title} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="text" name="company" placeholder="Company Name" value={internshipData.company} onChange={handleInputChange} className="p-2 border rounded" required />
            <textarea name="description" placeholder="Internship Description" value={internshipData.description} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="date" name="startDate" value={internshipData.startDate} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="date" name="endDate" value={internshipData.endDate} onChange={handleInputChange} className="p-2 border rounded" required />
            <input type="password" name="password" placeholder="Admin Password" value={internshipData.password} onChange={handleInputChange} className="p-2 border rounded" required />
            
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

export default Year1Computer;
