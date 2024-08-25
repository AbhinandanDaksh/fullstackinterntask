// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Weather = () => {
//   const [weatherData, setWeatherData] = useState(null);
//   const [forecastData, setForecastData] = useState([]);
//   const [location, setLocation] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [unit, setUnit] = useState("metric");
//   const [error, setError] = useState(null);

//   const API_KEY = "b79db76c47426e083f4de7c819d26356";

//   const fetchWeatherByCoords = async (lat, lon) => {
//     try {
//       const weatherResponse = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
//       );
//       setWeatherData(weatherResponse.data);

//       const forecastResponse = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
//       );
//       const dailyData = forecastResponse.data.list.filter((reading) =>
//         reading.dt_txt.includes("12:00:00")
//       );
//       setForecastData(dailyData);
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching weather data.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (location) {
//       const fetchWeatherByCity = async () => {
//         try {
//           const weatherResponse = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=${unit}`
//           );
//           setWeatherData(weatherResponse.data);

//           const forecastResponse = await axios.get(
//             `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=${unit}`
//           );
//           const dailyData = forecastResponse.data.list.filter((reading) =>
//             reading.dt_txt.includes("12:00:00")
//           );
//           setForecastData(dailyData);
//           setLoading(false);
//         } catch (error) {
//           setError("City not found. Please try another city.");
//           setLoading(false);
//         }
//       };

//       fetchWeatherByCity();
//     }
//   }, [location, unit]);

//   const handleLocationChange = (event) => {
//     setLocation(event.target.value);
//   };

//   const toggleUnit = () => {
//     setUnit(unit === "metric" ? "imperial" : "metric");
//   };

//   const handleGetCurrentLocation = () => {
//     setLoading(true);
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
//       },
//       (error) => {
//         setError("Unable to retrieve your location.");
//         setLoading(false);
//       }
//     );
//   };

//   return (
//     <div>
//       <h1>Weather App</h1>
//       <input
//         type="text"
//         value={location}
//         onChange={handleLocationChange}
//         placeholder="Enter city"
//       />
//       <button onClick={() => setLoading(true)}>Get Weather</button>
//       <button onClick={handleGetCurrentLocation}>Use Current Location</button>
//       <button onClick={toggleUnit}>
//         Toggle to {unit === "metric" ? "Fahrenheit" : "Celsius"}
//       </button>

//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <div>
//           <h2>Current Weather in {weatherData.name}</h2>
//           <p>{weatherData.weather[0].description}</p>
//           <img
//             src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
//             alt="weather icon"
//           />
//           <p>Current Temperature: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}</p>
//           <p>Min Temperature: {weatherData.main.temp_min}°{unit === "metric" ? "C" : "F"}</p>
//           <p>Max Temperature: {weatherData.main.temp_max}°{unit === "metric" ? "C" : "F"}</p>
//           <p>Humidity: {weatherData.main.humidity}%</p>
//           <p>Wind: {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}, {weatherData.wind.deg}°</p>

//           <h2>5-Day Forecast</h2>
//           <div style={{ display: "flex", justifyContent: "space-around" }}>
//             {forecastData.map((day, index) => (
//               <div key={index} style={{ margin: "10px", padding: "10px", border: "1px solid #ccc" }}>
//                 <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
//                 <p>{day.weather[0].description}</p>
//                 <img
//                   src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
//                   alt="weather icon"
//                 />
//                 <p>Temp: {day.main.temp}°{unit === "metric" ? "C" : "F"}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Weather;
