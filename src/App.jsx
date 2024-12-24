import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import JobListContainer from './components/JobListContainer';

const App = () => {
  return (
    <Router>
      <Routes>
 
        <Route path="/" element={<Navigate to="/jobs" />} />

        <Route path="/jobs" element={<JobListContainer />} />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
