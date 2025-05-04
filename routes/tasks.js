const express = require("express");
const router = express.Router();
router.use(express.json());

const { tasks } = require("../models/task");

router.get("/", (req, res) => {
  let result = [...tasks];
  return res.status(200).json(result);
});

router.get("/:taskId", (req, res) => {
  const param = Number(req.params.taskId);
  let allTasks = [...tasks];
  const task = allTasks.find((task) => task.id == param);
  if (!task) {
    return res.send("Not found");
  }
  res.send(task);
});

router.post("/", (req, res) => {
  const { title, description } = req.body;

  console.log(req.body);

  const latestTask = tasks[tasks.length - 1];
  const id = latestTask ? latestTask.id + 1 : 1;
  const task = {
    id,
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(task);
  return res.status(201).json({ message: `Task created with ID: ${id}`, task });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

  console.log(req.body);
  const currentTask = tasks?.find((t) => t?.id === id);
  currentTask.title = title ? title : currentTask?.title;
  currentTask.description = description
    ? description
    : currentTask?.description;
  return res
    .status(201)
    .json({ message: `Task created with ID: ${id}`, currentTask });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  console.log(req.body);
  const deletedTask = tasks.splice(taskIndex, 1)[0];
  return res.status(201).json({ message: `Task deleted: ${id}`, tasks });
});

module.exports = router;
