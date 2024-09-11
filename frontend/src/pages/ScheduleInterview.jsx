import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ScheduleInterview = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    club: '',
    isCompleted: false
  });

  const [ clubList, setClubList ] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async() => {
      const res = await axios.get(`http://localhost:3000/api/user/${token}`);
      setClubList(res.data.clubs);
    }
    fetchUserData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      await axios({
        method: 'post',
        url: 'http://localhost:3000/api/interviews/',
        data: formData
      });
      alert("Meeting scheduled successfully")

      setFormData({
        name: '',
        date: '',
        time: '',
        club: '',
        isCompleted: false
      });
    } catch (error) {
      alert('Error in Scheduling. Please try again.');
    }
  };

  return (
    <div className="p-6 ml-64 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Schedule an Interview</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Applicant Name Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Applicant Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter the applicant's name"
            required
          />
        </div>

        {/* Date Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Time Input */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Club Selection */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Select Club
          </label>
          <select
            name="club"
            value={formData.club}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          >
            <option>Select a Club</option>            
            {clubList.map((elem) => (
              <option key={elem} value={elem}>
                {elem}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="p-4 w-full bg-[#2E3138] text-[#FFEDDF] rounded-lg shadow hover:bg-gray-800
              hover:text-[#FFEDDF] transition duration-300"
        >
          Schedule Interview
        </button>
      </form>
    </div>
  );
};

export default ScheduleInterview;
