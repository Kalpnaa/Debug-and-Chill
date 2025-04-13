const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/packpal", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("Mongo Error:", err));

// Routes
const eventRoutes = require("./routes/events");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");


app.use("/api/events", eventRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
