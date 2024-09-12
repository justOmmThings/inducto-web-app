import React, { useState } from 'react';
import RecentInterviews from './RecentInterviews';
import PendingInterviews from './PendingInterviews'; 

const Interviews = () => {
  const [activeTab, setActiveTab] = useState('recent');

  return (
    <div className="p-6 ml-64 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Interviews</h1>
      <div className="border-b border-gray-300 mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab('recent')}
            className={`py-2 px-4 ${activeTab === 'recent' ? 'border-b-2 border-[#2E3138]' : 'text-gray-600'}`}
          >
            Recent Interviews
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`py-2 px-4 ${activeTab === 'pending' ? 'border-b-2 border-[#2E3138]' : 'text-gray-600'}`}
          >
            Pending Interviews
          </button>
        </nav>
      </div>
      {activeTab === 'recent' ? <RecentInterviews /> : <PendingInterviews />}
    </div>
  );
};

export default Interviews;
