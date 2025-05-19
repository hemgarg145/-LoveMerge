const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes"); // Ensure correct path
const interactionRoutes = require("./routes/interactionRoutes");



const app = express();
const PORT = 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/datingapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
  app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
});


// ✅ Route Registration

app.use("/api", authRoutes); // Ensures /api/signup is available
app.use("/api", require("./routes/authRoutes")); 
app.use("/api", interactionRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
