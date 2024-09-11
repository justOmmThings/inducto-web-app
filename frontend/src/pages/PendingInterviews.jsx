import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PendingInterviews = () => {
  const [interviews, setInterviews] = useState([]);

  // Fetch pending interviews from API
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/interviews/pending-interviews');
        setInterviews(res.data);
      } catch (error) {
        console.error("Error fetching pending interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  // Mark an interview as done
  const markAsDone = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/interviews/${id}/complete`);
      setInterviews(interviews.filter((interview) => interview._id !== id));
      alert("Marked as done");
    } catch (error) {
      console.error('Error marking interview as done:', error);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Pending Interviews</h1>
      {interviews.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-white border border-gray-300 rounded-md shadow-md">
          <p className="text-lg text-gray-600">
            No pending interviews at the moment.
          </p>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="p-4 text-left">Applicant</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">Club</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id} className="border-b">
                <td className="p-4">{interview.name}</td>
                <td className="p-4">{interview.date}</td>
                <td className="p-4">{interview.time}</td>
                <td className="p-4">{interview.club}</td>
                <td className="p-4">
                  <button
                    onClick={() => markAsDone(interview._id)}
                    className="px-4 py-2 bg-[#2E3138] text-white rounded-lg shadow hover:bg-gray-900 transition duration-300"
                  >
                    Mark as Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingInterviews;
