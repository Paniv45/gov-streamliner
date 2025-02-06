import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import '../style/SchemesDashboard.css';
import Chatbot from './Chatbot';
import Footer from './footer';

const SchemesDashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Sample user profile
  const userProfile = {
    name: "Aarav Sharma",
    gender: "Woman", 
    state: "uttar_pradesh", 
    age: 25, 
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/schemes');
        setSchemes(response.data);
        setFilteredSchemes(response.data);
      } catch (err) {
        console.error('API fetch error:', err.message);
        setError('Error fetching schemes.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  // Search functionality
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filtered = schemes.filter((scheme) => {
      const tags = Array.isArray(scheme.tags) ? scheme.tags.map(tag => tag.toLowerCase()) : [];
      return (
        scheme.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        tags.some(tag => tag.includes(e.target.value.toLowerCase()))
      );
    });
    setFilteredSchemes(filtered);
  };

  // Match schemes based on user profile
  const handleShowSchemes = () => {
    const scoredSchemes = schemes.map((scheme) => {
      // Split tags into individual words if needed and process them into lowercase
      const tags = Array.isArray(scheme.tags)
        ? scheme.tags.flatMap(tag => tag.toLowerCase().split(' ')) 
        : [];

      let matchCount = 0;

      // console.log("Tags for scheme:", tags); 

      if (userProfile.gender && tags.includes(userProfile.gender.toLowerCase())) {
        matchCount++;
      }
      if (userProfile.state && tags.includes(userProfile.state.toLowerCase())) {
        matchCount++;
      }
      if (userProfile.age && tags.includes(userProfile.age.toString())) {
        matchCount++;
      }

      // console.log(`Match count for scheme ${scheme.title}:`, matchCount); // Debugging log for match count

      return { ...scheme, matchCount };
    });

    // Filter out schemes with 0 matches and sort by matchCount
    const filteredAndSortedSchemes = scoredSchemes
      .filter((scheme) => scheme.matchCount > 0) // Remove schemes with no matches
      .sort((a, b) => b.matchCount - a.matchCount); // Sort by match count in descending order

    // If no schemes match, show a message
    if (filteredAndSortedSchemes.length === 0) {
      setError('No schemes match your profile.');
    }

    setFilteredSchemes(filteredAndSortedSchemes);
  };

  const handleSchemeClick = (id) => {
    navigate(`/scheme/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <div className="dashboard-container">
      <h1>Available Schemes</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search schemes..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>

      <button className="profile-button" onClick={() => navigate('/UserProfileForm')}>
        <FaUserCircle /> Go to Profile
      </button>

      <button 
        className="show-schemes-button" 
        onClick={handleShowSchemes} 
        style={{
          backgroundColor: 'green', 
          color: 'white', 
          border: 'none', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          fontSize: '16px', 
          cursor: 'pointer', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
          transition: 'background 0.3s ease'
      }}
    >


        Show Schemes Based on My Profile
      </button>

      <ul className="schemes-list">
        {filteredSchemes.map((scheme) => (
          <li key={scheme._id} className="scheme-item">
            <button className="scheme-title" onClick={() => handleSchemeClick(scheme._id)}>
              {scheme.title} {scheme.matchCount > 0 && <span>(Matches: {scheme.matchCount})</span>}
            </button>
          </li>
        ))}
      </ul>
      <Chatbot/>
      
    </div>
    <Footer/>
    </>
    
  );
};

export default SchemesDashboard;
