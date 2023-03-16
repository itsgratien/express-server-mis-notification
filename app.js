const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

const port = 8000;

const user = {
  id: 1,
  username: "gratien",
  password: "kigali",
};

const merchant = {
  merchant_code: "TH12000810",
  payer_code: "mis-2023",
  payer_names: "john doe",
  payer_must_pay_total_amount: "YES",
  service_group_code: "school-fees",
  service_code: "school-fees",
  amount: 5,
  currency: "RWF",
};

const secretKey = "humble";

app.use(cors({ origin: "*" }));

app.use(express.json());

const isAuth = (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const getToken = token.split(" ")[1];

    if (!getToken) {
      return res.status(401).json({ message: "unauthorized" });
    }

    jwt.verify(getToken, secretKey);

    return next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};
app.post("/callback", isAuth, (req, res) => {
  console.log("callback body:", req.body);

  return res.json({ message: "callback sent" });
});

app.post("/auth", (req, res) => {
  const { user_name, password } = req.body;

  if (user_name !== user.username || password !== user.password) {
    return res.status(401).json({ message: "unauthorized" });
  }

  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "2h" });

  return res.json({ message: "auth", data: { token } });
});

app.post("/notification", isAuth, (req, res) => {
  console.log("notification body:", req.body);

  return res.json({ message: "notification" });
});

app.post("/validation", isAuth, (req, res) => {
  console.log("validation body:", req.body);

  return res.json({
    message: "validation",
    status: 200,
    data: merchant,
  });
});

app.listen(port, () => {
  console.log(`App listened on port ${port}`);
});
