const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, TRAVEL_ADVISOR_KEY } = process.env;
const axios = require("axios");
//LOCATIONID : 155032
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// defining url for api endpoint
const url =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

// query params & api key
const option = {
  params: {
    bl_latitude: "45.379064",
    tr_latitude: "45.728599",
    bl_longitude: "-73.974227",
    tr_longitude: "-73.421422",
    restaurant_tagcategory_standalone: "10591",
    restaurant_tagcategory: "10591",
    limit: "35",
    currency: "CAD",
    open_now: "false",
    lunit: "km",
    lang: "en_CA",
  },
  headers: {
    "X-RapidAPI-Key": `${TRAVEL_ADVISOR_KEY}`,
    "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
  },
};

// async function to store hotels in mongodb database
const importResto = async () => {
  try {
    const response = await axios.get(url, option);
    const resto = response.data;

    // mapping over given data to extract specific data from the response data obtained from the API call
    const data = resto.data.map((items) => ({
      name: items.name,
      latitude: items.latitude,
      longitude: items.longitude,
      ranking: items.ranking,
      rating: items.rating,
      photo: items.photo,
      price_level: items.price_level,
      price: items.price,
      description: items.description,
      neighborhood_info: items.neighborhood_info,
      phone: items.phone,
      website: items.website,
      email: items.email,
      address: items.address,
      dietary_restrictions: items.dietary_restrictions,
      availability: {
        seats: 10,
      },
    }));

    const availability = Object.values(
      resto.restaurant_availability_options
    ).map((item) => ({
      time: item.time_option,
      people: item.people,
    }));

    // connect to mongodb database and insert data retrieved from hotel into "hotels" collection
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final");

    // combine both arrays together
    const documents = data.map((item) => Object.assign(item, availability[0]));
    const result = await db.collection("resto").insertMany(documents);

    client.close();
  } catch (error) {
    console.log(error);
  }
};

importResto();
