import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { getCurrentWeather, getForecast } from "../services/weatherService";

// 🔥 REQUIRED FOR CHART.JS
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [chartData, setChartData] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await getCurrentWeather(city);
      setWeather(res.data);

      const { lat, lon } = res.data.coord;

      const forecastRes = await getForecast(lat, lon);

      const labels = forecastRes.data.list.map(item => item.dt_txt);
      const temps = forecastRes.data.list.map(item => item.main.temp);

      setChartData({
        labels,
        datasets: [
          {
            label: "Temperature (°C)",
            data: temps,
            borderColor: "blue",
            backgroundColor: "lightblue",
            fill: false,
            tension: 0.3
          }
        ]
      });

    } catch (error) {
      alert("City not found!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🌦 Weather App</h2>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}

      {chartData && (
        <div style={{ width: "80%", margin: "auto" }}>
          <Line data={chartData} key={JSON.stringify(chartData)} />
        </div>
      )}
    </div>
  );
};

export default Weather;