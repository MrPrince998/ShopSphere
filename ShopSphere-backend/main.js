require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/db");
const port = process.env.PORT;

// import routes
const authRoutes = require("./src/routes/auth.routes");

// initialize app
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// use routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authRoutes);

app.listen(port, async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log("Database connection failed:", error.message);
    process.exit(1);
  }
});
