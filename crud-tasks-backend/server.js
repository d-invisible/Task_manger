const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://diniTasks:1234Tasks@cluster-1-tasks.shlkj.mongodb.net/crudTasks?retryWrites=true&w=majority&appName=cluster-1-tasks', 
    { useNewUrlParser: true, useUnifiedTopology: true });

// Task Model
const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});
const Task = mongoose.model('Task', TaskSchema);

// CRUD Routes
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
