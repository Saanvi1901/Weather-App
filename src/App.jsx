import React, { useState } from 'react';
import Home from './components/Home';
import Weather from './components/Weather';

const App = () => {
  const [showWeather, setShowWeather] = useState(false);

  const navigateToWeather = () => {
    setShowWeather(true);
  };

  const navigateBackToHome = () => {
    setShowWeather(false);
  };

  return (
    <div className="app-container">
      {!showWeather && <Home navigateToWeather={navigateToWeather} />}
      {showWeather && <Weather navigateBackToHome={navigateBackToHome} />}
    </div>
  );
};

export default App;
