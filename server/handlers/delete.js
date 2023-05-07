"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// delete reservations
const deleteRes = async (req, res) => {
  // get id through params
  const reservation = req.params.reservation;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("final");

    // in "users" collection, find a user who has a reservation with a specific _id value with $elemMatch & uses projection object, in this case, "reservations", to limit results matching reservation using the $ positional operator.
    const user = await db
      .collection("users")
      .findOne(
        { reservations: { $elemMatch: { _id: reservation } } },
        { "reservations.$": 1 }
      );

    if (!user) {
      return res
        .status(404)
        .json({ status: 404, message: "reservation not found" });
    }

    //creates variables by destructuring the req.body object & checks which of these variables has a truthy value and assigns a collectionName and query object
    const { hotel, restaurant, attraction } = req.body;
    let collectionName;
    let query;

    if (restaurant) {
      collectionName = "resto";
      query = { name: restaurant };
    } else if (attraction) {
      collectionName = "aboutMtrl";
      query = { name: attraction };
    } else if (hotel) {
      collectionName = "hotels";
      query = { name: hotel };
    }

    if (!collectionName || !query) {
      return res.status(400).json({
        status: 400,
        message: "no reservation",
      });
    }

    // updates availability in database for hotel
    const hotelCollection = db.collection(collectionName);
    const updateHotel = { $inc: { "availability.minRoomsLeft": 1 } };

    // updates availability in database for restaurant & activities
    const collection = db.collection(collectionName);
    const update = {
      $inc: {
        "availability.seats": 1,
      },
    };

    // check if the modifiedCount property of the resulting object is 0
    const updateResult = await collection.updateOne(query, update);
    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "res not found",
      });
    }
    // check if the modifiedCount property of the resulting object is 0
    const result = await hotelCollection.updateOne(query, updateHotel);
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        status: 404,
        message: "Reservation not found",
      });
    }

    // deletes reservation in "users" collection and updates database
    const deleteResult = await db
      .collection("users")
      .updateOne(
        { _id: user._id },
        { $pull: { reservations: { _id: reservation } } }
      );

    // checks if reservation was deleted
    if (deleteResult.modifiedCount === 1) {
      return res.status(200).json({
        status: 200,
        message:
          "Reservation deleted. You will be redirected to your account shortly",
      });
    } else {
      return res.status(500).json({
        status: 500,
        message: "Failed to delete reservation.",
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = { deleteRes };
