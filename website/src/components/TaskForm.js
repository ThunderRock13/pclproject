import React, { useState } from 'react';

const TaskForm = ({ onTaskAdded }) => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState({ hour: '12', minute: '00', period: 'AM' });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct full date and time string
        const dueDateTime = `${dueDate}T${dueTime.period === 'PM' && dueTime.hour !== '12' ?
            (parseInt(dueTime.hour) + 12).toString().padStart(2, '0') :
            dueTime.hour.padStart(2, '0')}:${dueTime.minute}:00`;

        if (taskName && dueDate) {
            onTaskAdded(taskName, dueDateTime);
            setTaskName('');
            setDueDate('');
            setDueTime({ hour: '12', minute: '00', period: 'AM' });
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />
            <div className="time-picker">
                {/* Hour selection */}
                <select
                    value={dueTime.hour}
                    onChange={(e) => setDueTime({ ...dueTime, hour: e.target.value })}
                    required
                >
                    {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={(i + 1).toString().padStart(2, '0')}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <span>:</span>

                {/* Minute selection: Updated to allow selection of any minute */}
                <select
                    value={dueTime.minute}
                    onChange={(e) => setDueTime({ ...dueTime, minute: e.target.value })}
                    required
                >
                    {Array.from({ length: 60 }, (_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                            {i.toString().padStart(2, '0')}
                        </option>
                    ))}
                </select>

                {/* AM/PM selection */}
                <select
                    value={dueTime.period}
                    onChange={(e) => setDueTime({ ...dueTime, period: e.target.value })}
                    required
                >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
