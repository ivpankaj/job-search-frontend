import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobListContainer from './components/JobListContainer';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the job list */}
        <Route path="/" element={<Navigate to="/jobs" />} />

        {/* Route for the Job List and Job Details */}
        <Route path="/jobs" element={<JobListContainer />} />

        {/* Fallback for unmatched routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
