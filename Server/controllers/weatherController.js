import axios from "axios";

export const getWeather = async (req, res) => {

    try {

        const city = req.query.city || "Ranchi";

        const url =
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=yes`;

        const response = await axios.get(url);

        res.json(response.data);

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "Weather API Error"
        });

    }

};