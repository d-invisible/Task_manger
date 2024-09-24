import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });

    // Fetch tasks from backend
    useEffect(() => {
        axios.get('http://localhost:5000/tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    const handleCreateTask = () => {
        axios.post('http://localhost:5000/tasks', newTask).then((response) => {
            setTasks([...tasks, response.data]);
            setNewTask({ title: '', description: '', completed: false });
        });
    };

    const handleDeleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
            setTasks(tasks.filter(task => task._id !== id));
        });
    };

    return (
        <div className="container">
            <h1>My Tasks</h1>
            <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <button onClick={handleCreateTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
