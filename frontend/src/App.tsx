import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
    const [updateList, setUpdateList] = useState(false);

    const refreshTaskList = () => {
        setUpdateList(!updateList);
    };

    return (
        <div className="bg-gray-200 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
            <TaskForm onTaskCreated={refreshTaskList} />
            <TaskList />
        </div>
    );
};

export default App;
