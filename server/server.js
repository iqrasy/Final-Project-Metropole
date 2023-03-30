const express = require("express");
const morgan = require("morgan");
const { auth } = require("express-openid-connect");

const app = express();
const server = require("http").createServer(app);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "0803770ce2e293f381edf49e24afd7069d76501125d21de3de7b8f8e3a659be2",
  baseURL: "http://localhost:3000",
  clientID: "tf9wkiEt2zuAf4CIjFpwAscCbCCOUQUs",
  issuerBaseURL: "https://dev-vweb3ixudv0jw4r8.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

const PORT = 4000;

app
  .use(express.json())
  .use(morgan("dev"))

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is not what you are looking for.",
    });
  });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
