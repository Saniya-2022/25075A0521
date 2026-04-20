const key = "e8b5361fbffd8b9629602a93b3a00738";
let chart;

// MAIN FUNCTION (ES6 async/await)
const getWeather = async () => {
  const city = document.getElementById("city").value.trim();

  if (!city) return alert("Enter city");

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`
    );

    const data = await res.json();

    if (!data.list) return alert("City not found");

    // Get 8 data points (24 hours)
    const list = data.list.slice(0, 8);

    // ES6 array functions
    const temps = list.map(x => x.main.temp);
    const labels = list.map(x =>
      new Date(x.dt * 1000).getHours() + ":00"
    );

    // Display city name
    document.getElementById("weatherInfo").innerHTML = `
      <h3>${data.city.name}, ${data.city.country}</h3>
      <p>Temperature forecast for the next 24 hours (3-hour intervals)</p>
    `;

    drawChart(labels, temps);

  } catch (e) {
    alert("Error fetching data");
  }
};

// DRAW GRAPH
const drawChart = (labels, temps) => {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Temperature (°C)",
        data: temps,
        borderColor: "#f39c12",
        backgroundColor: "rgba(243,156,18,0.4)",
        fill: true,
        tension: 0.4,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
};