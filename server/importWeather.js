const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, OW_API_KEY } = process.env;
const axios = require("axios");

//LOCATIONID : 155032

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// defining coordinates for montreal weather
const lat = "45.5017";
const lon = "-73.5673";

// defining url for api endpoint
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`;

const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`;

// async function to store hotels in mongodb database
const importWeather = async () => {
  try {
    // Promise.all to make two HTTP GET requests to the url and forecastUrl endpoints simultaneously.
    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get(url),
      axios.get(forecastUrl),
    ]);

    // assigning JSON data to weather & forecast, respectfully
    const weather = weatherResponse.data;
    const forecast = forecastResponse.data;

    // connect to mongodb database and insert data retrieved from hotel into "hotels" collection
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("openweather").insertOne({
      current: weather,
      forecast: forecast,
    });
    console.log(result);

    client.close();
  } catch (error) {
    console.log(error);
  }
};

importWeather();
