require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/db");
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  const isConnected = connectDB();
  if (isConnected) {
    console.log("Database connected successfully");
  } else {
    console.log("Database connection failed");
    process.exit(1);
  }
  console.log(`Server is running on port ${port}`);
});
