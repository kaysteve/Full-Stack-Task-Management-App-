const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { name } = req.body;
  const newTask = new Task({ name });
  await newTask.save();
  res.status(201).json(newTask);
});

router.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;
