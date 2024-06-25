import React from 'react';
import './Home.css'; 

const Home = ({ navigateToWeather }) => {
  return (
    <div className="home-container">
      <h1 className="home-heading">Home Component</h1>
      <button className="navigation-button" onClick={navigateToWeather}>
        Go to Weather
      </button>
    </div>
  );
};

export default Home;


