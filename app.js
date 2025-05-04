const express = require("express");
const app = express();
require("dotenv").config();
const taskRoutes = require("./routes/tasksRouter");
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Task API is running");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }

  console.log(`Server is listening on ${port}`);
});

module.exports = app;
