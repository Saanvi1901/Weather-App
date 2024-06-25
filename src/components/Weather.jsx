import React, { useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";
import './Weather.css'; 

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCityNameChange = (e) => {
    setCityName(e.target.value);
    setWeatherData(null);
    setError(null);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=1dc6bf85545d4ab28de82346241806&q=${cityName}&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.error.message);
        setWeatherData(null);
      }
    } catch (error) {
      setError("Failed to fetch data");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter City"
          value={cityName}
          onChange={handleCityNameChange}
        />
        <img src={search_icon} alt="Search" onClick={fetchWeatherData} />
      </div>
      {weatherData && (
        <div className="weather-data">
          <h2 className="location">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <div className="temperature">
            {weatherData.current.temp_c}°C
          </div>
          <div className="weather-icon">
            <img src={getWeatherIcon(weatherData.current.condition.text)} alt="Weather Icon" />
          </div>
          <div className="weather-details">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                Humidity: {weatherData.current.humidity}%
                <span>{weatherData.location.localtime}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

// Helper function to get appropriate weather icon
const getWeatherIcon = (condition) => {
  switch (condition.toLowerCase()) {
    case 'clear':
    case 'sunny':
      return clear_icon;
    case 'cloudy':
    case 'partly cloudy':
      return cloud_icon;
    case 'drizzle':
      return drizzle_icon;
    case 'rain':
      return rain_icon;
    case 'snow':
      return snow_icon;
    case 'windy':
      return wind_icon;
    default:
      return cloud_icon;
  }
};

export default Weather;
