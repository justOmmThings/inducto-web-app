import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {

  const token = localStorage.getItem('token');
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async() => {
      const res = await axios.get(`http://localhost:3000/api/user/${token}`);
      setUser(res.data)
    }

    fetchUserData();
  }, []);

  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/interviews/upcoming-interviews');
        setUpcomingInterviews(res.data);
      } catch (error) {
        console.error("Error fetching pending interviews:", error);
      }
    };
    fetchInterviews();
  }, []);

  const [totalInterviewCount, setTotalInterviewCount] = useState(0);
  useEffect(() => {
    const fetchTotalInterviwes = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/interviews/');
        setTotalInterviewCount(res.data.length);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchTotalInterviwes()
  }, [])

  const [totalPendingCount, setTotalPendingCount] = useState(0);
  useEffect(() => {
    const fetchPendingInterval = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/interviews/pending-interviews');
        setTotalPendingCount(res.data.length);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchPendingInterval()
  }, [])

  const stats = [
    { label: 'Total Interviews', value: totalInterviewCount },
    { label: 'Pending Interviews', value: totalPendingCount },
    { label: 'Completed Interviews', value: totalInterviewCount - totalPendingCount },
    { label: 'Average Feedback', value: '4.5/5' },
  ];

  const quickLinks = [
    { label: 'Schedule Interview', link: '/schedule-interview' },
    { label: 'View Applicants', link: '/applicants' },
    { label: 'Generate Report', link: '/report' },
    { label: 'Manage Clubs', link: '/clubs' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen ml-64">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Here's a summary of your current activities.</p>
      </div>

      {/* Upcoming Interviews Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Interviews</h2>
        <div className="grid grid-cols-1 gap-6">
          {upcomingInterviews.map((interview, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg">
              <h3 className="font-bold text-lg">{interview.name}</h3>
              <p>{interview.date} at {interview.time}</p>
              <p className="text-gray-500">Club: {interview.club}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Interview Summary</h2>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-lg">
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 gap-6">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="p-4 bg-[#2E3138] text-[#FFEDDF] rounded-lg shadow hover:bg-gray-800
              hover:text-[#FFEDDF] transition duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
