import React,{useState} from "react";
import{useDispatch} from 'react-redux';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../redux/features/auth/authSlice';  // Correct import based on your Redux setup


const Login = () => {
  const[message,setMessage]=useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  const[loginUser,{isLoading:loginLoading}]=useLoginUserMutation()
  const navigate=useNavigate()



  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
        email,
        password,
    };

    try {
        const response = await loginUser(data).unwrap();
        const { token, user } = response;
        dispatch(setUser({ user })); // Save user data to state

        // Access Year and Branch directly from the user object
        console.log("Year:", user.Year, "Branch:", user.Branch); // Debugging
        const { Year, Branch } = user;

        //  Now use Year and Branch for conditional navigation
        if (user.Year === "1" && user.Branch.toLowerCase() === "computer") {
            console.log("Navigating to: /year1computer");
            navigate("/year1computer");
        } else if (user.Year === "3" && user.Branch.toLowerCase() === "mechanical") {
            console.log("Navigating to: /year3mechanical");
            navigate("/year3mechanical");
        } else if (user.Year === "2" && user.Branch.toLowerCase() === "electronics") {
            console.log("Navigating to: /year2electronics");
            navigate("/year2electronics");
        } else if (user.Year === "4" && user.Branch.toLowerCase() === "mechanical") {
            console.log("Navigating to: /year4-mechanical");
            navigate("/year4-mechanical");
        } else {
            console.log("No matching condition found. Navigating to default page.");
             // Default fallback page
        }
    } catch (error) {
        console.error("Login failed:", error);
        setMessage("Please provide a valid email and password");
    }
};

  
   return (
    <section className="h-screen flex items-center justify-center">
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Please Login        </h2>
     <form  onSubmit={handleLogin} className="space-y-5 max-w-sm mx-auto pt-8">
      <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email address " required
      className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}  placeholder="password " required
      className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
      {
        message && <p className="text-red-500">{message}</p>
      }
      <button type="submit" className="w-full mt-5 bg-blue-400 text-white hover:bg-indigo-500 font-medium py-3 rounded-md">Login</button>
      <p className="my-5 italic text-sm text-center">Dont have an account ?<Link to="/register" className="text-red-700">Register</Link> here.</p>

     </form>
      </div>
    </section>
  

  );
};

export default Login;
