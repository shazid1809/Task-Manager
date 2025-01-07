const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.json());

// File path to store tasks
const filePath = './tasks.json';

// Read all tasks
app.get('/tasks', async (req, res) => {
  try {
    const taskInfo = await fs.readFile(filePath, 'utf8');
    const tasks = JSON.parse(taskInfo);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Read a single task
app.get('/tasks/:taskId', async (req, res) => {
  try {
    const taskInfo = await fs.readFile(filePath, 'utf8');
    const tasks = JSON.parse(taskInfo);
    const taskId = req.params.taskId;
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const taskInfo = await fs.readFile(filePath, 'utf8');
    const tasks = JSON.parse(taskInfo);
    const newTask = req.body;
    tasks.push(newTask);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a task
app.put('/tasks/:taskId', async (req, res) => {
  try {
    const taskInfo = await fs.readFile(filePath, 'utf8');
    let tasks = JSON.parse(taskInfo);
    const taskId = req.params.taskId;
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    tasks[taskIndex] = req.body;
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    res.json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a task
app.delete('/tasks/:taskId', async (req, res) => {
  try {
    const taskInfo = await fs.readFile(filePath, 'utf8');
    let tasks = JSON.parse(taskInfo);
    const taskId = req.params.taskId;
    tasks = tasks.filter(task => task.id !== taskId);
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Serve client-side UI
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
