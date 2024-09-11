import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/interviews/recent-interviews');
        setInterviews(res.data);
      } catch (error) {
        console.error("Error fetching pending interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recent Interviews</h2>
      {interviews.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white border border-gray-300 rounded-md shadow-md">
          <p className="text-lg text-gray-600">No recent interviews to show.</p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="p-4 text-left">Applicant</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Club</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-b">
                <td className="p-4">{interview.name}</td>
                <td className="p-4">{interview.date}</td>
                <td className="p-4">{interview.time}</td>
                <td className="p-4">{interview.club}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentInterviews;
