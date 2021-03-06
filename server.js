require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const path = require("path");

// Routes
const authRoutes = require("./routes/authRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

// Connect to mongo db
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use(morgan("tiny"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", meetingRoutes);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));