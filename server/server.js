const express = require("express");
const morgan = require("morgan");
const {
  getHotels,
  getResto,
  getAttractions,
  getWeather,
  getReservations,
  getReservation,
} = require("./handlers/get");
const {
  createHotels,
  createResto,
  createAttractions,
} = require("./handlers/create");

const { updateRes } = require("./handlers/update");

const { deleteRes } = require("./handlers/delete");

const app = express();
const server = require("http").createServer(app);

const PORT = 4000;

app
  .use(express.json())
  .use(morgan("dev"))

  // GET
  .get("/api/hotels", getHotels)
  .get("/api/resto", getResto)
  .get("/api/attractions", getAttractions)
  .get("/api/weather", getWeather)
  .get("/api/reservation/:reservation", getReservation)
  .get("/api/reservations/:email", getReservations)

  // POST
  .post("/api/hotelres", createHotels)
  .post("/api/restores", createResto)
  .post("/api/attractionres", createAttractions)

  // UPDATE
  .patch("/api/update/:reservation", updateRes)

  // DELETE
  .put("/api/delete-reservation/:reservation", deleteRes)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "oops.",
    });
  });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
