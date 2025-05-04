const express = require("express");
const {
  getTaskById,
  validateInputs,
  updateTaskById,
  isValidPriority,
} = require("../controllers/taskController");
const router = express.Router();
router.use(express.json());

const { tasks } = require("../models/task");

router.get("/", (req, res) => {
  let result = [...tasks];
  const completed = req.query.completed === "true";
  const order = req.query.sort;
  if (order && order !== "asc" && order !== "desc") {
    return res.status(404).send("Invalid sort input");
  }

  const finalTasks = result?.filter((t) => (completed ? t?.completed : true));
  finalTasks.sort((a, b) => {
    return order === "asc"
      ? new Date(a.createdAt) - new Date(b.createdAt)
      : new Date(b.createdAt) - new Date(a.createdAt);
  });
  return res.status(200).json(finalTasks);
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
  const addTask = ({ title, description, completed, priority } =
    req.body || {});

  const isValid = validateInputs(addTask);
  if (!isValid?.status) {
    return res.status(400).send("Invalid Input! " + isValid?.message);
  }
  const currentTask = tasks[tasks.length - 1];
  const id = currentTask ? currentTask.id + 1 : 1;
  const task = {
    id,
    title: title.trim(),
    description: description.trim(),
    completed: completed || false,
    createdAt: new Date(),
    priority: priority ? priority?.trim() : undefined,
  };
  tasks.push(task);
  return res.status(201).json({ message: `Task created with ID: ${id}`, task });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const input = ({ title, description, priority } = req.body || {});

  let updateTask = getTaskById(id);
  if (!updateTask) {
    return res.status(404).send("Task not found");
  }
  const isValid = validateInputs(input);
  if (!isValid?.status) {
    return res.status(400).send("Invalid Input! " + isValid?.message);
  }
  updateTask = updateTaskById(updateTask, input);
  return res
    .status(201)
    .json({ message: `Task updated ID: ${id}`, task: updateTask });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).send({ message: `Id ${id} Not found!` });
  }
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res
    .status(204)
    .json({ message: `Task deleted: ${id}`, task: deletedTask });
});

router.get("/priority/:level", (req, res) => {
  let result = [...tasks];
  const level = req.params.level;
  if (!isValidPriority(level)) {
    return res.status(404).send("Invalid priority");
  }

  const finalTasks = result?.filter((t) => t?.priority === level);
  finalTasks.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
  return res.status(200).json(finalTasks);
});

module.exports = router;
