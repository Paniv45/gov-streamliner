import React from "react";
import { useNavigate } from "react-router-dom"; // Use navigate for routing
import '../style/FrontPage.css'; // Import the CSS file for styling
import Footer from "./footer";


const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/SchemesDashboard"); 
  };

  return (
    <div className="landing-page">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-logo">
          <h1 style={{ color: 'white' }}>Gov Schemes</h1>
        </div>
        <div className="navbar-login">
          <button className="login-btn" onClick={handleLogin}>Login</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="picture">
            <img 
              src="https://media.licdn.com/dms/image/v2/D4D0BAQGEkNw8gQ527g/company-logo_200_200/company-logo_200_200/0/1696920514115?e=2147483647&v=beta&t=OmAFbSl_dqMKQJIRP86cW2HYfNS-kbOIkWBs-8eo_Sc" 
              alt="Company Logo"
              
            />
          </div>
          <h2>Your Gateway to Government Schemes</h2>
          <p>
            Find the best government schemes tailored for you. Get recommendations based on your profile, and explore options like never before.
          </p>

          {/* Talk to Our Bot Section */}
          <section className="talk-to-bot">
            <h3>Talk to Our Bot in Your Own Way</h3>
            <p>Have questions? Ask our bot to find the right government schemes for you.</p>
            <button className="talk-btn" onClick={handleLogin}>Start Chat</button>
          </section>
        </div>
      </div>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="features-cards">
          <div className="feature-card">
            <h3>Personalized Recommendations</h3>
            <p>
              Get personalized scheme recommendations based on your profile and needs. Whether you're looking for education support, scholarships, or business funding, we have it all.
            </p>
          </div>
          <div className="feature-card">
            <h3>User-Friendly Interface</h3>
            <p>
              Our easy-to-use platform allows you to search and apply for schemes with minimal effort. A clean interface that works for everyone.
            </p>
          </div>
          <div className="feature-card">
            <h3>Search by Category</h3>
            <p>
              Search schemes based on various categories, such as for students, women, seniors, or individuals from specific regions.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Start Exploring Now</h2>
        <p>
          Discover the schemes that can change your life. Search now or sign up for more personalized recommendations.
        </p>
        <button className="explore-btn" onClick={handleLogin}>Explore Schemes</button>
      </section>

      <Footer/>
    </div> 
    
  );
};

export default LandingPage;
