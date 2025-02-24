import React,{useState}  from 'react';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';

import { Link ,useNavigate} from 'react-router-dom';

const Register = () => {
   const[message,setMessage]=useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [Year, setYear] = useState("");
    const [Branch, setBranch] = useState("");
    const[registerUser,{isLoading:loginLoading}]=useRegisterUserMutation()
    const navigate= useNavigate()


  
    const handleRegister = async (e) => {
      e.preventDefault();
      const data = {
        email,
        password,
        Name,
        Year,
        Branch
      };
    
     
  const handleRegister=async(e)=>{
    e.preventDefault();
    const data={
        email,
        password,
        Name,
        Year,
        Branch
    }
  
    };
    
    try {
    await registerUser(data).unwrap();
      alert("Registration successful")
      navigate('/login')
      
    } catch (error) {
      setMessage('Registration failed')
    }
  
  }
  return (
    <section className="h-screen flex items-center justify-center">
          <div className="max-w-sm border shadow bg-white mx-auto p-8">
            <h2 className="text-2xl font-semibold pt-5">Please Register      </h2>
         <form  onSubmit={handleRegister} className="space-y-5 max-w-sm mx-auto pt-8">
         <input type="Name" name="Name" id="Name" onChange={(e)=>setName(e.target.value)} placeholder="First Name " required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
          <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} placeholder="email address " required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
            <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}  placeholder="password " required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
           <input type="Year" name="Year" id="year" onChange={(e)=>setYear(e.target.value)} placeholder="year " required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
           <input type="Branch" name="Branch" id="Branch" onChange={(e)=>setBranch(e.target.value)} placeholder="eg:Computer " required
          className="w-full bg-gray-100 focus:outline-none px-5 py-3" />
          {
            message && <p className="text-red-500">{message}</p>
          }
          <button type="submit" className="w-full mt-5 bg-blue-400 text-white hover:bg-indigo-500 font-medium py-3 rounded-md">Login</button>
          <p className="my-5 italic text-sm text-center">Dont have an account ?<Link to="/login" className="text-red-700">Register</Link> here.</p>
    
         </form>
          </div>
        </section>
      
    
      );
};

export default Register;
