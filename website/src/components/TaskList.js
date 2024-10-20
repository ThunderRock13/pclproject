// TaskList.js
import React from 'react';
import '../assets/TaskList.css'; // Import your CSS file

const TaskList = ({ tasks, onDelete }) => {
    return (
        <div className="task-list">
            <h3>Tasks:</h3>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id} className={task.isPast && !task.completed ? 'past-due' : ''}>
                            {task.name} - {task.pDate}
                            <button onClick={() => onDelete(task._id)} className="delete-button">X</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
