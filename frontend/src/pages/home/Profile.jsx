import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "../../redux/features/auth/authApi";
import avatarImg from "/Users/sayyednigar/Desktop/careerReadiness/frontend/src/assets/avatarImg.png";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [updateProfile] = useUpdateUserProfileMutation();

    const [formData, setFormData] = useState({
        Name: "",
        email: "",
        skills: "",
        cgpa: "",
        Year: "",
        Branch: "",
        role: "",
        profileImageUrl: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (user && user.user) {
          console.log("User object:", user.user); 
            setFormData({
                Name: user.user.Name || "",
                email: user.user.email || "",
                skills: user.user.skills || "",
                cgpa: user.user.cgpa || "",
                Year: user.user.Year || "",
                Branch: user.user.Branch || "",
                role: user.user.role || "",
                profileImageUrl: user.user.profileImageUrl || "",
                userId: user.user.id || "",

            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent page refresh on form submit
    
      // Destructure formData to create profileData
      const { Name, email, skills, cgpa, Year } = formData;
      
      const profileData = {
        name: Name,
        email,
        skills,
        cgpa,
        year: Year, // Ensure correct mapping
      };
    
      try {
        const response = await fetch("http://localhost:5001/api/auth/update-profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData), // Send profile data as JSON
          credentials: "include", // Include cookies if using authentication
        });
    
        if (response.ok) {
          console.log("Profile updated successfully!");
        } else {
          console.error("Failed to update profile");
        }
      } catch (err) {
        console.error("Error occurred: ", err);
      }
    };
    
    
  
  const validateForm = () => {
    if (!formData.Name.trim()) {
      alert("Name is required");
      return false;
    }
    if (formData.cgpa && isNaN(formData.cgpa)) {
      alert("CGPA must be a valid number");
      return false;
    }
    return true;
  };
  
  
  
  

  
  

    const defaultAvatarUrl = "/images/default-avatar.png"; // Path to default avatar

    return (
      <div className="container mx-auto p-8 max-w-2xl bg-gray-100 rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
     <div>
    <div className="flex justify-center mb-6">
        <div 
            className="cursor-pointer"
            onClick={() => document.getElementById("profileImage").click()} // Trigger file input on click
        >
            {imagePreview || formData.profileImageUrl ? (
                <img
                    src={imagePreview || formData.profileImageUrl}
                    alt="Profile"
                    className="w-32 h-32 rounded-full"
                />
            ) : (
                <img src={avatarImg} alt="Default Avatar" className="w-32 h-32 rounded-full" />
            )}
        </div>
        {/* Hidden File Input */}
        <input
            type="file"
            id="profileImage"
            name="profileImage"
            onChange={handleImageChange}
            className="hidden" // Hidden input
        />
    </div>
</div>


            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="Name" className="block text-gray-700 font-bold mb-2">Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="w-full border rounded-lg p-2 text-gray-700 bg-gray-200 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor="Year" className="block text-gray-700 font-bold mb-2">Year</label>
                    <input
                        type="text"
                        id="Year"
                        name="Year"
                        value={formData.Year}
                        readOnly
                        className="w-full border rounded-lg p-2 text-gray-700 bg-gray-200 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor="Branch" className="block text-gray-700 font-bold mb-2">Branch</label>
                    <input
                        type="text"
                        id="Branch"
                        name="Branch"
                        value={formData.Branch}
                        readOnly
                        className="w-full border rounded-lg p-2 text-gray-700 bg-gray-200 cursor-not-allowed"
                    />
                </div>
                <div>
    <label htmlFor="Skills" className="block text-gray-700 font-bold mb-2">Skills</label>
    <input
        type="text"
        id="Skills"
        name="skills"
        value={formData.skills} // Controlled value
        onChange={handleChange} // Handle changes
        className="w-full border rounded-lg p-2 text-gray-700"
    />
</div>
<div>
    <label htmlFor="Cgpa" className="block text-gray-700 font-bold mb-2">Cgpa</label>
    <input
        type="text"
        id="Cgpa"
        name="cgpa"
        value={formData.cgpa} // Controlled value
        onChange={handleChange} // Handle changes
        className="w-full border rounded-lg p-2 text-gray-700"
    />
</div>

             
              <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
    
};

export default Profile;
