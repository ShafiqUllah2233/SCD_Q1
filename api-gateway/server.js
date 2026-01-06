const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Use environment variables for service URLs (Docker) or fallback to localhost (local development)
const AUTH_SERVICE = process.env.AUTH_SERVICE_URL || "http://localhost:4001";
const USER_SERVICE = process.env.USER_SERVICE_URL || "http://localhost:4002";
const DOCTOR_SERVICE = process.env.DOCTOR_SERVICE_URL || "http://localhost:4003";
const APPOINTMENT_SERVICE = process.env.APPOINTMENT_SERVICE_URL || "http://localhost:4004";

// Generic proxy function
const proxyRequest = (serviceUrl) => async (req, res) => {
  try {
    const url = `${serviceUrl}${req.url}`;
    const response = await axios({
      method: req.method,
      url: url,
      data: req.body,
      headers: { 'Content-Type': 'application/json' }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Service unavailable" });
    }
  }
};

// Route all requests to respective services
app.use("/auth", proxyRequest(AUTH_SERVICE));
app.use("/users", proxyRequest(USER_SERVICE));
app.use("/doctors", proxyRequest(DOCTOR_SERVICE));
app.use("/appointments", proxyRequest(APPOINTMENT_SERVICE));

app.get("/health", (_, res) => res.send("Gateway OK"));

app.listen(4000, () => console.log("API Gateway on 4000"));
