import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Sidebar = () => {
  const navigate = useNavigate();
  
  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async() => {
      const res = await axios.get(`http://localhost:3000/api/user/${token}`);
      setUser(res.data);
    }
    fetchUserData();
  }, []);

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  } 

  return (
    <div className="w-64 bg-[#2E3138] rounded-sm text-white h-full flex flex-col fixed">
      <div className="p-4 text-lg font-semibold border-b border-[#FFEDDF]">
        Inducto
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 flex flex-col space-y-2">
        <Link
          to="/"
          className="p-4 text-white hover:bg-gray-700 hover:text-gray-200 hover:font-bold transition-colors duration-300"
        >
          Dashboard
        </Link>
        <Link
          to="/interviews"
          className="p-4 text-white hover:bg-gray-700 hover:text-gray-200 hover:font-bold transition-colors duration-300"
        >
          Interviews
        </Link>
        <Link
          to="/schedule-interview"
          className="p-4 text-white hover:bg-gray-700 hover:text-gray-200 hover:font-bold transition-colors duration-300"
        >
          Schedule an Interview
        </Link>
      </nav>

      {/* Sign Out Button at the Bottom */}
      <div className="absolute bottom-0 w-full flex justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full text-white text-lg">
            {String(user.name).charAt(0).toUpperCase()}
          </div>
          <span>{user.name}</span>
        </div>
        <button
          onClick={handleClick}
          className="text-[#FFEDDF] hover:bg-[#2E3138] hover:text-white transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;