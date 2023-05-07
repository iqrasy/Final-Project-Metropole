"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const { v4: uuidv4 } = require("uuid");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createHotels = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    // extracting the required fields from the req.body object
    const { hotel, givenName, surName, email, number, people } = req.body;

    if (!hotel || !givenName || !surName || !email || !number || !people) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing required fields" });
    }

    // checks if there are any available rooms for a specific hotel in the database.
    //  uses findOne method in the "hotels" collection in the database to find a document that matches the query.
    const query = {
      name: hotel,
      "availability.available": true,
      "availability.minRoomsLeft": { $gt: 0 },
    };
    const hotelExists = await db.collection("hotels").findOne(query);

    if (!hotelExists) {
      return res.status(404).json({
        status: 404,
        message: "No rooms available for this hotel.",
      });
    }

    // creates new reservation with unique _id
    const newReservation = {
      _id: uuidv4(),
      hotel,
      givenName,
      surName,
      email,
      number,
      people,
    };

    // adds reservation to "reservation" collection
    const addReservation = await db
      .collection("reservation")
      .insertOne(newReservation);

    const user = await db.collection("users").findOne({ email });

    // checks if entered email matches the user logged in email
    if (!user || email !== user.email) {
      return res
        .status(401)
        .json({ status: 401, error: "Email does not match" });
    }

    // empty reservations array
    let reservations = [];

    // pushes new reservation in the empty reservations array within the "users" collection
    if (user) {
      const updateUser = await db
        .collection("users")
        .updateOne({ email }, { $push: { reservations: newReservation } });
    }

    // decrements availability in "hotels" collection
    const hotelQuery = {
      name: hotel,
      "availability.available": true,
    };

    const update = {
      $inc: { "availability.minRoomsLeft": -people },
    };

    const updateHotel = await db
      .collection("hotels")
      .updateOne(hotelQuery, update);

    if (addReservation.insertedId) {
      res.status(200).json({
        status: 200,
        data: {
          ...newReservation,
          reservationId: newReservation._id,
        },
        message: "Reservation created.",
      });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "Failed to create reservation." });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const createResto = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    // extracting the required fields from the req.body object
    const { restaurant, givenName, surName, email, number, people } = req.body;

    if (!restaurant || !givenName || !surName || !email || !number || !people) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing required fields" });
    }

    // checks if there are any availabilities left for a specific restaurant in the database.
    //  uses findOne method in the "resto" collection in the database to find a document that matches the query.
    const restoQuery = {
      name: restaurant,
      "availability.seats": { $gt: 0 },
    };
    const restoExists = await db.collection("resto").findOne(restoQuery);

    if (!restoExists) {
      return res
        .status(404)
        .json({ status: 404, message: "Booking not available" });
    }

    // creates new reservation with unique _id
    const newReserve = {
      _id: uuidv4(),
      restaurant,
      givenName,
      surName,
      email,
      number,
      people,
    };

    // adds reservation to "reservation" collection
    const addReservation = await db
      .collection("reservation")
      .insertOne(newReserve);

    const user = await db.collection("users").findOne({ email });
    // checks if entered email matches the user logged in email
    if (!user || email !== user.email) {
      return res
        .status(401)
        .json({ status: 401, error: "Email does not match" });
    }

    // empty reservations array
    let reservations = [];

    // pushes new reservation in the empty reservations array within the "users" collection
    if (user) {
      const updateUser = await db
        .collection("users")
        .updateOne({ email }, { $push: { reservations: newReserve } });
    }

    // decrements availability in "resto" collection
    const query = {
      name: restaurant,
      "availability.seats": { $gt: 0 },
    };

    const update = {
      $inc: {
        "availability.seats": -people,
      },
    };
    const updateResto = await db.collection("resto").updateOne(query, update);

    if (addReservation.insertedId) {
      res.status(200).json({
        status: 200,
        data: { ...newReserve, reservationId: newReserve._id },
        message: "reservation created",
      });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "Failed to create reservation" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

const createAttractions = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    // extracting the required fields from the req.body object
    const { attraction, givenName, surName, email, number, people } = req.body;

    if (!attraction || !givenName || !surName || !email || !number || !people) {
      return res
        .status(400)
        .json({ status: 400, error: "Missing required fields" });
    }

    // checks if there are any availabilities left for a specific activity in the database.
    //  uses findOne method in the "aboutMtrl" collection in the database to find a document that matches the query.
    const query = {
      name: attraction,
      "availability.seats": { $gt: 0 },
    };

    const attractionExists = await db.collection("aboutMtrl").findOne(query);

    if (!attractionExists) {
      return res
        .status(404)
        .json({ status: 404, message: "Booking not available" });
    }

    // creates new reservation with unique _id
    const newReserve = {
      _id: uuidv4(),
      attraction,
      givenName,
      surName,
      email,
      number,
      people,
    };

    //

    const addReservation = await db
      .collection("reservation")
      .insertOne(newReserve);

    const user = await db.collection("users").findOne({ email });
    // checks if entered email matches the user logged in email
    if (!user || email !== user.email) {
      return res
        .status(401)
        .json({ status: 401, error: "Email does not match" });
    }

    // empty reservations array
    let reservations = [];

    // pushes new reservation in the empty reservations array within the "users" collection
    if (user) {
      const updateUser = await db
        .collection("users")
        .updateOne({ email }, { $push: { reservations: newReserve } });
    }

    // decrements availability in "aboutMtrl" collection
    const attractionQuery = {
      name: attraction,
      "availability.seats": { $gt: 0 },
    };

    const update = {
      $inc: {
        "availability.seats": -people,
      },
    };

    const updateResto = await db
      .collection("aboutMtrl")
      .updateOne(attractionQuery, update);

    if (addReservation.insertedId) {
      res.status(200).json({
        status: 200,
        data: { ...newReserve, reservationId: newReserve._id },
        message: "reservation created",
      });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "Failed to create reservation" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = { createHotels, createAttractions, createResto };
