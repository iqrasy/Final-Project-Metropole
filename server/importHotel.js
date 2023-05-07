const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, TRAVEL_ADVISOR_KEY } = process.env;
const axios = require("axios");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// defining url for api endpoint
const url = "https://hotels-com-provider.p.rapidapi.com/v2/hotels/search";

// query params & api key
const option = {
  params: {
    domain: "CA",
    sort_order: "RECOMMENDED",
    locale: "en_CA",
    checkout_date: "2023-12-31",
    region_id: "4005",
    adults_number: "1",
    checkin_date: "2023-05-10",
  },
  headers: {
    "X-RapidAPI-Key": `${TRAVEL_ADVISOR_KEY}`,
    "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
  },
};

// async function to store hotels in mongodb database
const importHotel = async () => {
  try {
    const response = await axios.get(url, option);
    const hotel = response.data;

    // mapping over given data to extract specific data from the response data obtained from the API call
    const newData = hotel.properties.map((item) => ({
      id: item.id,
      name: item.name,
      regionId: item.regionId,
      availability: item.availability,
      propertyImage: item.propertyImage,
      map: item.mapMarker,
      price: item.price,
      reviews: item.reviews,
      priceMetadata: item.priceMetadata,
    }));

    // mapping over given data to extract specific data from the response data obtained from the API call
    const data = Object.values(hotel.filterMetadata).map((list) => ({
      neighborhoods: list.neighborhoods,
      priceRange: list.priceRange,
    }));

    // connect to mongodb database and insert data retrieved from hotel into "hotels" collection
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final");

    // combine both arrays together
    const documents = newData.map((item) => Object.assign(item, data[0]));
    const result = await db.collection("hotels").insertMany(documents);

    client.close();
  } catch (error) {
    console.log(error);
  }
};

importHotel();
