const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/weatherApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const weatherSchema = new mongoose.Schema({
    location: String,
    temperature: Number,
    condition: String,
    icon: String,
    date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

// Endpoint to get weather data
app.get('/weather', async (req, res) => {
    const location = req.query.location;
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=51f5db559bb74dc697e101028242806&q=${location}`);
        const data = response.data;

        const weather = new Weather({
            location: data.location.name,
            temperature: data.current.temp_c,
            condition: data.current.condition.text,
            icon: data.current.condition.icon
        });

        await weather.save();
        res.json(weather);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});