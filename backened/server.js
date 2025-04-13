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
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
