import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import "jspdf-autotable";

const Resume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "",
    education: "",
    experience: "",
    skills: "",
    certifications: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("times");
    
    // Resume Header
    doc.setFontSize(24);
    doc.text(formData.name || "Your Name", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email || "Your Email"} | Phone: ${formData.phone || "Your Phone"}`, 105, 30, { align: "center" });
    
    let yPosition = 45;
    
    // Links Section (All in one line)
    const linksText = [];
    if (formData.linkedin) linksText.push(`LinkedIn: ${formData.linkedin}`);
    if (formData.github) linksText.push(`GitHub: ${formData.github}`);
    if (formData.portfolio) linksText.push(`Portfolio: ${formData.portfolio}`);
    
    if (linksText.length > 0) {
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(linksText.join(" | "), 105, yPosition, { align: "center" });
      yPosition += 7;
      doc.setTextColor(0, 0, 0);
    }
    
    const sections = [
      { title: "EDUCATION", content: formData.education },
      { title: "EXPERIENCE", content: formData.experience },
      { title: "SKILLS", content: formData.skills },
      { title: "CERTIFICATIONS", content: formData.certifications },
    ];

    sections.forEach((section) => {
      if (section.content) {
        doc.setFontSize(16);
        doc.text(section.title, 20, yPosition);
        yPosition += 7;
        
        doc.setFontSize(12);
        const splitText = doc.splitTextToSize(section.content, 170);
        doc.text(splitText, 20, yPosition);
        yPosition += splitText.length * 6 + 5;
      }
    });

    doc.save("Professional_Resume.pdf");
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-10 bg-gray-200">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white shadow-lg p-10 rounded-lg border"
      >
        <h1 className="text-3xl font-bold text-center mb-8">Professional Resume Builder</h1>
        <form className="space-y-6">
          {[
            "Name", "Email", "Phone", "LinkedIn", "GitHub", "Portfolio", 
            "Education", "Experience", "Skills", "Certifications"
          ].map((field, index) => (
            <div key={index}>
              <label className="block font-semibold text-gray-700 mb-1">{field}</label>
              <input
                type="text"
                name={field.toLowerCase()}
                placeholder={`Enter your ${field}`}
                value={formData[field.toLowerCase()]}
                onChange={handleChange}
                className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-gray-500 bg-gray-50"
              />
            </div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={generatePDF}
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700"
          >
            Download Resume
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Resume;
