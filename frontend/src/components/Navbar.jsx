import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/slrtceLogo.jpg";  // Update the extension if necessary
import avatarImg from "../assets/avatarImg.png"; // Update the extension if necessary

import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";



const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation(); // This should be a destructured array

  const navigate=useNavigate
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);


  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
   

  ];

  const adminDropDownMenus = [
    { label: "Admin Dashboard", path: "/admin/dashboard" },
    // Add other admin-specific routes here
  ];

  const dropDownMenus = user?.role === 'admin' ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
 // Call the mutation to log the user out
      dispatch(logout());
      navigate('/') // Dispatch the logout action to update the state
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-2 flex justify-between items-center">
        <div className="nav__logo pl-2">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <ul className="nav__links flex space-x-4">
          <li>
            <Link to="/" className="hover:text-primary transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-primary transition duration-200">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-primary transition duration-200">
              Pages
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-primary transition duration-200">
              Contact
            </Link>
          </li>
        </ul>

        <div className="nav__icons flex space-x-4">
          <span>
            <Link to="/search">
              <i className="ri-search-line text-xl"></i>
            </Link>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt=""
                  className="size-6 rounded-full cursor-pointer"
                />
                {isDropDownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropDownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropDownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li><Link onClick={handleLogout}>Logout</Link></li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <i className="ri-user-line text-xl"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
