const express = require("express");
const {
  getTaskById,
  validateInputs,
} = require("../controllers/taskController");
const router = express.Router();
router.use(express.json());

const { tasks } = require("../models/task");

router.get("/", (req, res) => {
  let result = [...tasks];
  return res.status(200).json(result);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = getTaskById(id);
  if (!task) {
    return res.status(404).send("Not found");
  }
  res.status(200).send(task);
});

router.post("/", (req, res) => {
  const addTask = ({ title, description, completed } = req.body);

  const isValid = validateInputs(addTask);
  if (!isValid?.status) {
    return res.status(400).send("Invalid Input! " + isValid?.message);
  }
  const latestTask = tasks[tasks.length - 1];
  const id = latestTask ? latestTask.id + 1 : 1;
  const task = {
    id,
    title: title.trim(),
    description: description.trim(),
    completed: completed || "false",
    createdAt: new Date(),
  };
  tasks.push(task);
  return res.status(201).json({ message: `Task created with ID: ${id}`, task });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  const updateTask = getTaskById(id);
  const isValid = validateInputs(updateTask);
  if (!isValid?.status) {
    return res.status(400).send("Invalid Input! " + isValid?.message);
  }
  updateTask.title = title ? title : updateTask?.title;
  updateTask.description = description ? description : updateTask?.description;
  return res
    .status(201)
    .json({ message: `Task created with ID: ${id}`, task: updateTask });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).send({ message: `Id ${id} Not found!` });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res
    .status(201)
    .json({ message: `Task deleted: ${id}`, task: deletedTask });
});

module.exports = router;
