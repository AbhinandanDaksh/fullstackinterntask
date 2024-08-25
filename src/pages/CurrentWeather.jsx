
import React, { useState, useEffect } from "react";
import axios from "axios";
import Location from "../assets/Location.png";
import celsius from "../assets/celsius.png";
import fahrenheit from "../assets/fahrenheit.png";
import cloud from "../assets/cloud.png"
import humidity from "../assets/humidity.png"
import wind from "../assets/wind.png"

const CurrentWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [activeTab, setActiveTab] = useState("location");
  const [location, setLocation] = useState(null); // State to store location data

  const API_KEY = "b79db76c47426e083f4de7c819d26356";

  // fetch weather data on the basis of current location
  useEffect(() => {
    if (location) {
      fetchWeather(location.latitude, location.longitude);
    }
  }, [location, unit]);

  // take data fron api
  const fetchWeather = async (lat, lon) => {
    setLoading(true);
    try {
      // fetch data for current time 
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      // fatch data for upcoming days
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );

      const dailyData = forecastResponse.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );

      setWeatherData(weatherResponse.data);
      setForecastData(dailyData);
      setError(null);
      setLoading(false);
      setActiveTab("weather");
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Unable to fetch weather data. Please try again later.");
      setLoading(false);
    }
  };

  const getLocationAndFetchWeather = () => {
    if (!location) { 
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude }); 
          },
          (error) => {
            console.error("Error getting location", error);
            setError("Unable to retrieve your location. Please enable location services.");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="">
      {activeTab === "location" && (
        <div className="flex flex-col justify-center items-center mt-10">
          <img src={Location} alt="Location Icon" />

          <h1 className="text-3xl font-semibold mt-10">Grant Location Access</h1>
          <h1 className="flex justify-center items-center text-center p-2">
            Allow access to receive weather information at your current location
          </h1>


          <button onClick={getLocationAndFetchWeather} className=" w-28 p-1 border rounded-md bg-slate-300 border-black hover:bg-[#9836B3]">Get Weather</button>
        </div>
      )}

      {activeTab === "weather" && weatherData && (
        <div>
          <button onClick={toggleUnit} className=" flex justify-center items-center">
            <h1 className="flex text-xl font-semibold pt-1">Switch to {unit === "metric" ? <img src={fahrenheit} alt="Fahrenheit" /> : <img src={celsius} alt="Celsius" />}</h1>
          </button>
          
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2 pt-2">
              <h2 className="text-4xl font-extrabold uppercase">{weatherData?.name}</h2>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
              <p className="text-xl font-medium uppercase">{weatherData.weather[0].description}</p>
              
              <p>
                Temp: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
              </p>
              <p>
                Min: {weatherData.main.temp_min}°{unit === "metric" ? "C" : "F"} | Max: {weatherData.main.temp_max}°{unit === "metric" ? "C" : "F"}
              </p>
              

              <div className=" flex gap-4 h-auto mt-5 text-center">
                <div className="bg-gray-200 uppercase p-3 flex  flex-col justify-center items-center w-28  border-2 rounded-md border-black">
                    <img src={humidity} alt="humidity icon" />
                    <h1>humidity</h1>
                    <p>{weatherData.main.humidity}%</p>
                </div>
                <div className="bg-gray-200 uppercase p-3 flex  flex-col justify-center items-center w-28  border-2 rounded-md border-black">
                    <img src={cloud} alt="humidity icon" />
                    <h1>Clouds</h1>
                    <p>{weatherData.clouds.all}%</p>
                </div>
                <div className="bg-gray-200 uppercase p-3 flex  flex-col justify-center items-center w-28 border-2 rounded-md border-black">
                  <img src={wind} alt="humidity icon" />
                  <h1>wind</h1>
                  <p>{weatherData.wind.speed}{" "}
                  {unit === "metric" ? "m/s" : "mph"}{" "}
                  {weatherData.wind.deg}°
                  </p>
                </div>
            </div>


            <h2 className="text-xl font-semibold flex uppercase mt-5 bg-white p-3 rounded-md gap-1">Upcoming forecast for <p className=" text-[#9836B3]">{ weatherData?.name}</p> </h2>
              <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }} className="mb-10">
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
                      className=" border rounded-md bg-slate-200"
                    >
                      <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
                      <img
                        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt="weather icon"
                      />
                      <p>{day.weather[0].description.slice(0,8)}...</p>
                      <p>
                        Temp: {day.main.temp}°{unit === "metric" ? "C" : "F"}
                      </p>
                    </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
