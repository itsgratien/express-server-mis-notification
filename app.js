const express = require("express");
const cors = require("cors");

const app = express();

const port = 8000;

app.use(cors({ origin: "*" }));

app.use(express.json());

app.post("/callback", (req, res) => {
  console.log("callback body:", req.body);

  return res.json({ message: "callback sent" });
});

app.post("/auth", (req, res) => {
  console.log("auth body:", req.body);

  return res.json({ message: "auth" });
});

app.post("/notification", (req, res) => {
  console.log("notification body:", req.body);

  return res.json({ message: "notification" });
});

app.listen(port, () => {
  console.log(`App listened on port ${port}`);
});
