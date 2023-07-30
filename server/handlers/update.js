"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateRes = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // gets id through params
  const reservation = req.params.reservation;

  try {
    await client.connect();
    const db = client.db("final");

    // extracting the required fields from the req.body object
    const { givenName, surName, email, number, people } = req.body;

    if (!givenName || !surName || !email || !number || !people) {
      return res
        .status(400)
        .json({ status: 404, error: "Missing required fields" });
    }

    // grabs reservations array in users collection
    // updates users reservation info with the necessary fields with updateOne
    const result = await db.collection("users").updateOne(
      { "reservations._id": reservation },
      {
        $set: {
          "reservations.$.givenName": givenName,
          "reservations.$.surName": surName,
          "reservations.$.email": email,
          "reservations.$.number": number,
          "reservations.$.people": people,
        },
      }
    );

    if (result.modifiedCount === 1) {
      res.status(200).json({
        status: 200,
        message:
          "Reservation updated. You will be redirected to your account shortly",
      });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "Failed to update reservation" });
    }
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
  }
};

module.exports = {
  updateRes,
};
