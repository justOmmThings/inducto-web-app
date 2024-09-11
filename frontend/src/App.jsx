import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard'
import Interviews from './pages/Interviews';
import ScheduleInterview from './pages/ScheduleInterview';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<ProtectedRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

const ProtectedRoutes = () => {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/interviews" element={<Interviews />} />
          <Route path="/schedule-interview" element={<ScheduleInterview />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
