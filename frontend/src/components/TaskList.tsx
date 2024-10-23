import React from 'react';
import { updateTask, deleteTask } from '../services/taskService';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    refreshTaskList: () => void;
    handleError: (message: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, refreshTaskList, handleError }) => {
    const handleComplete = async (task: Task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await updateTask(task.id, updatedTask);
            refreshTaskList();
            handleError("");
        } catch (err) {
            handleError("Failed to update task. Please try again later.");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            refreshTaskList();
            handleError("");
        } catch (err) {
            handleError("Failed to delete task. Please try again later.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Task List</h2>

            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className={`p-4 ${task.completed ? 'bg-green-400' : 'bg-white'} rounded-lg shadow-md flex justify-between items-center`}>
                        <div>
                            <h3 className="text-xl font-semibold">
                                {task.title} - {task.completed ? 'Completed' : 'In progress'}
                            </h3>
                            <p className="text-gray-600">{task.description}</p>
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => handleComplete(task)}
                                className={`px-4 py-2 rounded ${task.completed ? 'bg-gray-500' : 'bg-green-500'} text-white`}>
                                {task.completed ? 'Undo' : 'Complete'}
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="px-4 py-2 bg-red-500 text-white rounded">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
