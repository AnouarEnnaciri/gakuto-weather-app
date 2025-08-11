// script.js
const apiKey = "07f7fe5cd38ed5041fa712a10535ffb9";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  const resultDiv = document.getElementById("weather-result");

  if (!city) return;

  resultDiv.innerHTML = "Loading...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) throw new Error("City not found.");
      return response.json();
    })
    .then((data) => {
      const html = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      `;
      resultDiv.innerHTML = html;
    })
    .catch((err) => {
      resultDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
});
