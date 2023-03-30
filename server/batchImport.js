const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const axios = require("axios");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  try {
    const response = await axios.get("");
    const data = response.data;

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db();

    client.close();
  } catch (error) {
    console.log(error);
  }
};

batchImport();
