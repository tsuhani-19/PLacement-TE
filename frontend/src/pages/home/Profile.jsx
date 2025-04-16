import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserProfileMutation ,useGetUserQuery} from "../../redux/features/auth/authApi";
import avatarImg from "../../assets/avatarImg.png";


const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const [updateUserProfile] = useUpdateUserProfileMutation();
    const { data: userData, refetch } = useGetUserQuery();
    const navigate = useNavigate();
    // Define branch-specific company options (this could come from the backend)
    const branchCompanyMap = {
        Computer: [
            "TCS",
            "Infosys",
            "Wipro",
            "Amazon",
            "Google",
            "Microsoft",
            "IBM",
            "Accenture",
            "Seclore",
            "Nucsoft",
            "CEDCOSS TECHNOLOGIES",
            "MY PLAN 8",
            "LUMENS TECHNOLOGIES",
            "SOGOLYTICS",
            "MEDIA.NET",
            "JARO EDUCATION",
            "ZEUS LEARNING",
            "VISTAAR",
            "SYSTENICS SOLUTION",
            "SALES FORCE",
            "EXPOUND TECHNIVO",
            "DIGI PLUS",
            "CODEARRAY",
            "SANKEY SOLUTION",
            "ICICI SECURITIES LTD",
            "QSPIDERS",
            "EXCELR",
            "AXIS BANK",
            "JFE ENGINEERING",
            "NIMAP INFOTECH",
            "GLOBAL LOGIC TECHNOLOGIES PVT LTD",
            "NEXTEP CONTRUCTION",
            "KARZA TECHNOLOGIES PVT LTD",
            "SPINNAKERANALYTICS",
            "DWAO",
            "OSOS",
            "ATLAN",
            "RUBRIK",
            "SBI YOUTH FOR INDIA",
            "TALAKUNCHI NETWORKS PVT LTD",
            "AUTOMATION EDGE TECHNOLOGIES",
            "IT MNC- BEACON HEALTHCARE SYSTEMS",
            "CMSS",
            "KELP GLOBAL",
            "M/S JAGDISH PRASAD AGRAWAL",
            "TATA AUTOCOMP SYSTEM",
            "L & T CONTRUCTION LTD",
            "SUZLON GLOBAL SERVICES",
            "ALL WAVE AV SYSTEM",
            "REALINCE",
            "GODREJ",
            "VOLTAGO ELECTRICALS PVT. LTD.",
            "CRED",
            "PERCH TECHNOLOGIES PRIVATE LIMITED",
            "LUMINOUS POWER TECHNOLOGIES",
            "ROBOKART",
            "RELIANCE INDUSTRIES LIMITED (RIL)",
            "VIP",
            "QUALITY KIOSK",
            "MYRIAD SOLUTIONS",
            "MAXEFF ENGINEERING PVT LTD",
            "SUTHERLAND",
            "HPCL",
            "QUANTASIS",
            "NLC INDIA LTD",
            "NTT DATA",
            "RAGHUVIR DEVELOPERS & BUILDERS",
            "TATA PROJECT LTD",
            "AURA JEWELS",
            "YMS",
            "BALMER LAWRIE & CO. LTD.",
            "JUSPAY",
            "MASTERCARD",
            "ABSSOLUTE MECHATRONICS",
            "SALMAN PLACEMENT",
            "SHIELD BYTE INFOSEC PVT. LTD.",
            "DOLANTO ENGINEERING PVT. LTD.",
            "MERKLE",
            "J FOURCE",
            "CRM"
          ],
        Electronics: [
          "Texas Instruments",
          "Intel",
          "Qualcomm",
          "Samsung",
          "NVIDIA",
          "Bosch",
          "Siemens",
          "Honeywell",
        ],
        Mechanical: [
            "5G R&D DIVISION",
            "ZEECO INDIA",
            "PARAS CADD PVT LTD",
            "ALTERA DIGITAL HEALTH",
            "MEGA PIPES PVT LTD",
            "INTERNATIONAL INDUSTRIAL SPRINGS",
            "MASTEK",
            "DAVISON INSTRUMENTS PVT LTD",
            "STANDARD GROUP",
            "TECNIK",
            "HINDALCO INDUSTRIES LTD",
            "SKF INDIA LIMITED",
            "GAJANAN ISPAT PVT LTD",
            "ASHOK ENGINEERING WORKS",
            "STABLE MONEY",
            "NISIKI INDIA PVT LTD",
            "NOZZLE AUTO ASSOCIATION PVT LTD",
            "RADIANCE RENEWABLES PVT LTD",
            "BECTOR AUTOMATION RML INDIA PVT LTD",
            "SEA MARINE INSPECTION SERVICES",
            "AMBETRONICS",
            "MAERSK",
            "EXICOM TECHNOLOGIES INDIA PVT LTD",
            "RADHAKRISHNA AGRO INDUSTRIES PVT LTD",
            "KREATE ENERGY",
            "EPSILON DESIGN CONSULTANCY",
            "GOMA ENGINEERING PVT LTD",
            "KAVIN ENGINEERING AND SERVICES PVT LTD",
            "KROLL",
            "SELECT CONTROL",
            "ITD CEMENTATUION INDIA PVT LTD",
            "CR AUTOMATION PVT LTD",
            "RR PLAST EXTRUSION PVT LTD",
            "SHRI SEVALAL CONTRUCTION PVT LTD",
            "SULZER",
            "MEIL",
            "ABM KNOWLEDGEWARE",
            "SCHEMAPHIC SYSTEMS INDIA PVT LTD",
            "MICRO TESTING LAB SOLUTION PVT LTD",
            "FESTO",
            "SHIELD BYTE INFOSEC PVT. LTD.",
            "DOLANTO ENGINEERING PVT. LTD.",
            "MEDIA.NET",
            "MERKLE",
            "QUANTASIS",
            "J FOURCE",
            "SECLORE",
            "CRM",
            "TCS",
            "ACCENTURE",
            "GODREJ",
            "JARO EDUCATION",
            "VOLTAGO ELECTRICALS PVT. LTD.",
            "CRED",
            "PERCH TECHNOLOGIES PRIVATE LIMITED",
            "LUMINOUS POWER TECHNOLOGIES",
            "ROBOKART",
            "RELIANCE INDUSTRIES LIMITED (RIL)",
            "VIP",
            "QUALITY KIOSK",
            "MAXEFF ENGINEERING PVT LTD",
            "SUTHERLAND",
            "HPCL",
            "H. K. INFRA ENGINEERING",
            "NLC INDIA LTD",
            "NTT DATA",
            "RAGHUVIR DEVELOPERS & BUILDERS",
            "TATA PROJECT LTD",
            "AURA JEWELS",
            "YMS",
            "BALMER LAWRIE & CO. LTD.",
            "JUSPAY",
            "MASTERCARD",
            "IBM",
            "ABSSOLUTE MECHATRONICS",
            "SALMAN PLACEMENT"
          ],
        Civil: [
          "L&T",
          "DLF",
          "Tata Projects",
          "Gammon India",
          "Jaypee Group",
          "Punj Lloyd",
          "Shapoorji Pallonji",
        ],
      };

    const [formData, setFormData] = useState({
        Name: "",
        email: "",
        skills: "",
        cgpa: "",
        Year: "",
        Branch: "",
        role: "",
        preferedcompany:"",
        profileImageUrl: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5001/api/auth/users/${user.user._id}`, {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const userData = await response.json();
                console.log("Fetched user profile:", userData);

                setFormData({
                    ...formData,
                    Name: userData.Name || "",
                    email: userData.email || "",
                    skills: userData.skills || "",
                    cgpa: userData.cgpa || "",
                    Year: userData.Year || "",
                    Branch: userData.Branch || "",
                    role: userData.role || "",
                    profileImageUrl: userData.profileImage || "",
                    preferedcompany:userData.preferedcompany||"",
                    userId: user.user._id || "",
                });
            } catch (err) {
                console.error("Error fetching user profile:", err);
            }
        };

        fetchUserProfile();
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
        e.preventDefault();
    
        const { Name, skills, cgpa, userId,preferedcompany } = formData;
    
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }
    
        const profileData = {
            userId,
            Name,
            skills,
            cgpa,
            preferedcompany,
        };
    
        console.log("Sending profile data:", profileData);
    
        try {
            // Step 1: Update the profile using the mutation
            const updatedUser = await updateUserProfile(profileData).unwrap();
            console.log("Profile updated successfully!", updatedUser);
    
            // Step 2: Fetch the updated profile data
            const fetchResponse = await fetch(`http://localhost:5001/api/auth/users/${userId}`, {
                method: "GET",
                credentials: "include",
            });
    
            if (!fetchResponse.ok) {
                throw new Error("Failed to fetch updated profile");
            }
    
            const userData = await fetchResponse.json();
            console.log("Fetched updated profile:", userData);
    
            // Step 3: Update the local state with the new data
            setFormData({
                ...formData,
                Name: userData.Name || formData.Name,
                email: userData.email || formData.email,
                skills: userData.skills || formData.skills,
                cgpa: userData.cgpa || formData.cgpa,
                Year: userData.Year || formData.Year,
                Branch: userData.Branch || formData.Branch,
                role: userData.role || formData.role,
                preferedcompany:userData.preferedcompany || formData.preferedcompany,
                profileImageUrl: userData.profileImage || formData.profileImageUrl,
            });
    
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error occurred: ", err);
            alert(err.message || "An error occurred while updating the profile");
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
// Normalize Branch for lookup
const normalizedBranch = formData.Branch
? formData.Branch.charAt(0).toUpperCase() + formData.Branch.slice(1).toLowerCase()
: "";
const companyOptions = normalizedBranch
? branchCompanyMap[normalizedBranch] || ["No companies available for this branch"]
: ["Select a branch first"];

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
<div>
  <label htmlFor="preferedcompany" className="block text-gray-700 font-bold mb-2">
    Preferred Company
  </label>
  <select
            id="preferedcompany"
            name="preferedcompany"
            value={formData.preferedcompany}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a company</option>
            {companyOptions.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
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
