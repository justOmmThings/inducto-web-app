import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const SignUp = () => {

  const clubList = ['Shades', 'Music Club', 'ACM', 'CruX', 'Comedy Club'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    clubs: []
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === 'clubs') {
      const clubs = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, clubs }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await axios({
        method: 'post',
        url: 'http://localhost:3000/api/auth/register',
        data: formData
      });
      alert('Registration successful!');
      localStorage.setItem('token', token);
      navigate('/'); 

      setFormData({
        applicant: '',
        date: '',
        time: '',
        clubs: [],
      });
    } catch (error) {
      alert(eror);
    }
    console.log(JSON.stringify(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              placeholder='eg: John Doe'
            />
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select clubs you are part of</label>
            <select
              name="clubs"
              value={formData.clubs}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
              multiple
            >
              {clubList.map((club, index) => (
                <option key={index} value={club} className='py-1 px-2'>
                  {club}
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">Hold down the Ctrl (Windows) or Command (Mac) key to select multiple clubs.</p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2E3138] text-[#FFEDDF] rounded-lg shadow hover:bg-gray-800
              hover:text-[#FFEDDF] transition duration-300 p-3"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already a user?{' '}
            <Link to="/sign-in" className="text-[#2E3138] hover:text-gray-800 underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
