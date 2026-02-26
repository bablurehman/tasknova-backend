import taskModel from "../models/taskModel.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, priority = "medium" } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({ message: "Invalid priority value" });
    }

    const task = await taskModel.create({
      title,
      priority,
      completed: false,
      user: req.user.id,
    });

    return res.status(201).json({ success: true, message: "Task created successfully", task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, priority, completed } = req.body;

    if (title !== undefined) task.title = title;

    if (priority !== undefined) {
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({ message: "Invalid priority value" });
      }
      task.priority = priority;
    }

    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();

    return res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Task
export const getAllTask = async (req, res) => {
  try {
    const task = await taskModel
      .find({ user: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, message: "Tasks retrieved successfully",task });
  } catch (error) {
    return res.status(500).json({success:false, message: error.message });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
