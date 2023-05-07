"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get all hotels
const getHotels = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("hotels").find().toArray();

    res.status(200).json({ status: 200, data: result, message: "All hotels" });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// get all attractions
const getAttractions = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("aboutMtrl").find().toArray();

    res
      .status(200)
      .json({ status: 200, data: result, message: "All attractions" });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// get all restaurant
const getResto = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("resto").find().toArray();

    res
      .status(200)
      .json({ status: 200, data: result, message: "All restaurants" });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// get montreal weather
const getWeather = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    const result = await db.collection("openweather").find().toArray();

    res
      .status(200)
      .json({ status: 200, data: result, message: "mtrl weather" });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// get a single reservation based on id
const getReservation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const reservation = req.params.reservation;

  try {
    await client.connect();
    const db = client.db("final");

    const query = { _id: reservation };
    const result = await db.collection("reservation").findOne(query);

    if (result !== null) {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Current reservation",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Reservation not foundd",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

// get all reservations for a user
const getReservations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.email;

  try {
    await client.connect();
    const db = client.db("final");
    console.log(email);
    const query = { email: email };
    const result = await db.collection("users").findOne(query);
    console.log({ result });

    if (result !== null) {
      res.status(200).json({
        status: 200,
        data: result,
        message: "Current reservations",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Reservation not found",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = {
  getHotels,
  getAttractions,
  getResto,
  getWeather,
  getReservation,
  getReservations,
};
