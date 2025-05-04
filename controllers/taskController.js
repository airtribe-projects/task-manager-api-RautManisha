const { tasks } = require("../models/task");

const getTaskById = (id) => {
  return tasks?.find((t) => t?.id === id);
};

const validateInputs = (input, res) => {
  console.log("input", input);
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
  if (typeof input?.completed !== "boolean") {
    return {
      status: false,
      message: "Please enter valid Boolean for Completed!",
    };
  }
  return { status: true };
};

module.exports = { getTaskById, validateInputs };
