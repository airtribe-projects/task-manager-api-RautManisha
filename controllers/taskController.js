const { tasks } = require("../models/task");
const validPriorities = ["low", "medium", "high"];

const getTaskById = (id) => {
  return tasks?.find((t) => t?.id === id);
};

const isValidPriority = (priority) => {
  return validPriorities.includes(String(priority)?.toLocaleLowerCase());
};

const validateInputs = (input) => {
  if (!input?.title || !input?.description) {
    return { status: false, message: "Title or description cannot be empty!" };
  }
  if (typeof input?.title !== "string") {
    return { status: false, message: "Please enter valid String for Title!" };
  }
  if (typeof input?.description !== "string") {
    return {
      status: false,
      message: "Please enter valid String for Description!",
    };
  }
  if (input?.priority && !isValidPriority(input?.priority)) {
    return {
      status: false,
      message: "Please enter valid priority: low, medium or high",
    };
  }
  if (input?.completed && typeof input?.completed !== "boolean") {
    return {
      status: false,
      message: "Please enter valid Boolean for Completed!",
    };
  }
  return { status: true };
};

const updateTaskById = (task, input) => {
  const { title, description, completed, priority } = input;
  task.title = title;
  task.description = description;
  task.completed = completed;
  task.priority = priority;
  return task;
};

module.exports = {
  getTaskById,
  validateInputs,
  updateTaskById,
  isValidPriority,
};
