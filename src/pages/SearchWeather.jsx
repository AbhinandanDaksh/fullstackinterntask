import React, { useState, useEffect } from "react";
import axios from "axios";

import celsius from "../assets/celsius.png";
import fahrenheit from "../assets/fahrenheit.png";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const SearchWeather = () => {

//   const [weatherData, setWeatherData] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric"); 
  const [showWeather, setShowWeather] = useState(false);

  const API_KEY = "b79db76c47426e083f4de7c819d26356";

  // function to fetch Data from API
  const fetchWeather = async () => {
    setLoading(true);
    try {
      // fetch current weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`
      );
    // Upcoming weather forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=${unit}`
      );

// Filter the data for daily data
      const dailyData = forecastResponse.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );

      setWeatherData(weatherResponse.data);
      setForecastData(dailyData);
      setError(null);

      setShowWeather(true); 

    } 
    catch (error) {
      console.error("Error fetching the weather data", error);
      setError("City not found. Please try again.");
      setShowWeather(false); 
    } finally {
      setLoading(false);
    }
  };

// handle location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    setShowWeather(false); 
  };

  // changes celsius and fahrenheit
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

// weather data when unit changes
  useEffect(() => {
    if (showWeather) {
      fetchWeather();
    }
  }, [unit]);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2 ">Search City</h1>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter location"
              style={{ padding: "10px", flexGrow: 1 ,outline: '3px solid black' }}
              className="border rounded-md mt-2 mb-2"
            />

            <button onClick={fetchWeather} style={{ marginLeft: "10px", marginTop: "10px" }}>
              <img
                src="https://img.icons8.com/ios-filled/50/000000/search--v1.png"
                alt="Search Icon"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            
          </div>
      <button onClick={toggleUnit} className="flex justify-center items-center">
      <h1 className="text-xl font-semibold pt-1">Switch to</h1>
        {unit === "metric" ? <img src={fahrenheit} alt="Fahrenheit" /> : <img src={celsius} alt="Celsius" />}
      </button>

      {loading ? 
      (  <p>Loading...</p>)
       : 
      error ? (<p>{error}</p>) :

       (showWeather && weatherData && (
          <div className="flex flex-col justify-center items-center gap-2 pt-2">

            <h2 className="text-4xl font-semibold uppercase">{location}</h2>

            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt="weather icon"
            />


            <p className="text-xl font-medium uppercase">{weatherData.weather[0].description}</p>
            <p>
              Temp: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
              
            </p>
            {/* <p>Temp: {day.main.temp}°{unit === "metric" ? "C" : "F"}</p> */}
            <p>
              Min: {weatherData.main.temp_min}° | Max: {weatherData.main.temp_max}°
            </p>



            <div className="flex gap-4 h-auto mt-5">
              <div className="bg-gray-200 uppercase p-3 flex flex-col justify-center items-center w-28 border-2 border-black rounded-md">
                <img src={humidity} alt="humidity icon" />
                  <h1>Humidity</h1>
                <p>{weatherData.main.humidity}%</p>
              </div>
              <div className="bg-gray-200 uppercase p-3 flex flex-col justify-center items-center w-28 border-2 border-black rounded-md">
                <img src={cloud} alt="cloud icon" />
                <h1>Clouds</h1>
                <p>{weatherData.clouds.all}%</p>
              </div>
              <div className="bg-gray-200 uppercase p-3 flex flex-col justify-center items-center text-center w-28 border-2 border-black rounded-md">
                <img src={wind} alt="wind icon" />
                <h1>Wind</h1>
                <p>
                  {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"} {weatherData.wind.deg}°
                </p>
              </div>
            </div>



            <h2 className="text-xl font-semibold flex uppercase mt-5 bg-white p-3 rounded-md gap-1">
              Upcoming forecast for <p className="text-[#9836B3]">{location}</p>
            </h2>
            <div style={{ justifyContent: "space-around" }} className="mb-10 flex flex-wrap">
              {forecastData.map((day, index) => (
                <div
                  key={index}
                  style={{
                    margin: "10px",
                    padding: "10px",
                    border: "2px solid #000",
                    textAlign: "center",
                    minWidth: "120px",
                  }}
                  className="border rounded-md bg-gray-200"
                >
                  <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                  <p>{day.weather[0].description.slice(0, 8)}...</p>
                  <p>
                    Temp: {day.main.temp}°{unit === "metric" ? "C" : "F"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SearchWeather;
