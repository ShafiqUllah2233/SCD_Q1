const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

let appointments = [];

// Use environment variable for notification service URL or fallback to localhost
const NOTIFICATION_SERVICE = process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4005";

app.post("/appointments", async (req, res) => {
  const { userId, doctorId, date } = req.body;

  appointments.push({ userId, doctorId, date });

  // notify
  await axios.post(`${NOTIFICATION_SERVICE}/notify`, {
    message: "Appointment Booked"
  });

  res.json({ message: "Appointment confirmed" });
});

app.get("/appointments", (req, res) => {
  res.json(appointments);
});

app.delete("/appointments/:id", (req, res) => {
  appointments.splice(req.params.id, 1);
  res.json({ message: "Appointment cancelled" });
});

app.get("/health", (_, res) => res.send("Appointment OK"));

app.listen(4004, () => console.log("Appointment Service on 4004"));
