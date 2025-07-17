// 🔑 Replace this with your own API key from OpenWeatherMap
const API_KEY = 'a4ce9c6be807e9d5f2fd18efeaa5da99';

// DOM Elements
const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weather-description');

const moodBox = document.getElementById('mood-box');
const moodMessage = document.getElementById('mood-message');
const moodQuote = document.getElementById('mood-quote');
const moodGif = document.getElementById('mood-gif');

// 🌦️ Mood Logic Based on Weather
function getMood(weather) {
const moods = {
  Clear: {
    message: "Clear skies. Clear mind. Let’s win today.",
    quote: "Every sunrise is another chance to rise right.",
    gif: "https://media.giphy.com/media/3o6ZsXNn0Z6X7jhZIk/giphy.gif",
    bgColor: "#fff3b0"
  },
  Rain: {
    message: "Rain? That’s just the rhythm of focus.",
    quote: "Let the drip be your background beat.",
    gif: "https://media.giphy.com/media/xT1R9YZcPryLJ09p3e/giphy.gif",
    bgColor: "#c9d6df"
  },
  Thunderstorm: {
    message: "Electric outside, but you’re grounded.",
    quote: "Even storms gotta recharge.",
    gif: "https://media.giphy.com/media/3orieRzJntm09td0eE/giphy.gif",
    bgColor: "#aaa"
  },
  Clouds: {
    message: "Soft skies, but ideas stay sharp.",
    quote: "Cloudy minds still make bright moves.",
    gif: "https://media.giphy.com/media/fnKyKp4eRzx1y/giphy.gif",
    bgColor: "#e0e0e0"
  },
  Snow: {
    message: "Keep it cool, keep it moving ❄️",
    quote: "Chill never looked this clean.",
    gif: "https://media.giphy.com/media/3oEjHCWdU7F4DwZUw0/giphy.gif",
    bgColor: "#f0f8ff"
  }
};

 

  return moods[weather] || {
    message: "Just another day!",
    quote: "Make the most of it.",
    gif: "https://media.giphy.com/media/l3vRfNA1p0rvhMSvS/giphy.gif"
  };
}

// 📡 Fetch Weather Data
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const weather = data.weather[0].main;
    const temp = data.main.temp;

    // Populate weather info
    cityName.textContent = data.name;
    temperature.textContent = `${temp.toFixed(1)}°C`;
    weatherDescription.textContent = weather;

    weatherResult.classList.remove('hidden');

    // Set Mood
    const mood = getMood(weather);
    moodMessage.textContent = mood.message;
    moodQuote.textContent = mood.quote;
    moodGif.src = mood.gif;
    moodGif.alt = mood.message;
    moodBox.classList.remove('hidden');
  } catch (error) {
    alert("Could not fetch weather: " + error.message);
    weatherResult.classList.add('hidden');
    moodBox.classList.add('hidden');
  }
}

// 🚀 Form Submit Handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

// adding geolocation support 

