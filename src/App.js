import React, { useState } from 'react';
import './App.css';

function App() {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);

    const getWeather = () => {
        if (location) {
            fetch(`http://localhost:5000/weather?location=${location}`)
                .then(res => res.json())
                .then(data => {
                    setWeather(data);
                })
                .catch(err => console.error(err));
        } else {
            alert('Please enter a location.');
        }
    };

    return (
        <div className="container">
            <h1>Weather App</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            <button onClick={getWeather}>Get Weather</button>
            <div id="weather-result">
                {weather && (
                    <>
                        <h2>Weather in {weather.location}</h2>
                        <p>Temperature: {weather.temperature}°C</p>
                        <p>Condition: {weather.condition}</p>
                        <img src={weather.icon} alt={weather.condition} />
                    </>
                )}
            </div>
        </div>
    );
}

export default App;