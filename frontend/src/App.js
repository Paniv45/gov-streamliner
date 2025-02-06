import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchemesDashboard from './components/SchemesDashboard';
import SchemeDetails from './components/SchemeDetails';
import UserProfileForm from './components/UserProfileForm';
import LandingPage from './components/FrontPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SchemesDashboard" element={<SchemesDashboard />} />
        <Route path="/footer" element={<footer />} />
        <Route path="/scheme/:id" element={<SchemeDetails />} />
        <Route path="/UserProfileForm" element={<UserProfileForm />} />
        {/* <Route path="/Chatbot" element={<Chatbot />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
