const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, TRAVEL_ADVISOR_KEY } = process.env;
const axios = require("axios");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// defining url for api endpoint
const url = "https://travel-advisor.p.rapidapi.com/locations/search";

// query params & api key
const option = {
  params: {
    query: "montreal",
    limit: "30",
    offset: "0",
    units: "km",
    location_id: "1",
    currency: "CAD",
    sort: "relevance",
    lang: "en_CA",
  },
  headers: {
    "X-RapidAPI-Key": `${TRAVEL_ADVISOR_KEY}`,
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

// async function to store hotels in mongodb database
const importMtrl = async () => {
  try {
    const response = await axios.get(url, option);
    const about = response.data;

    // mapping over given data to extract specific data from the response data obtained from the API call
    const data = about.data.map((item) => ({
      type: item.result_type,
      info: item.result_object,
    }));

    const infoData = data.map((item) => {
      const {
        location_id,
        name,
        latitude,
        longitude,
        location_string,
        photo,
        address,
      } = item.info;

      return {
        location_id,
        name,
        latitude,
        longitude,
        location_string,
        photo,
        address,
        availability: {
          seats: 10,
        },
      };
    });

    // connect to mongodb database and insert data retrieved from hotel into "hotels" collection
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("aboutMtrl").insertMany(infoData);

    client.close();
  } catch (error) {
    console.log(error);
  }
};

importMtrl();
