import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/login',
        data: formData
      });
      login(response.data.token);
      navigate('/'); 
    } catch (error) {
      alert('Error logging in. Please try again.');
    }

    setFormData({
      applicant: '',
      date: '',
      time: '',
      clubs: [],
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              placeholder='eg: johndoe@gmail.com'
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              placeholder='eg: ●●●●●●●'
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#2E3138] text-[#FFEDDF] rounded-lg shadow hover:bg-gray-800
              hover:text-[#FFEDDF] transition duration-300 p-3"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already a user?{' '}
            <Link to="/sign-up" className="text-[#2E3138] hover:text-gray-800 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
