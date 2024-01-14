import React, { useState } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState('');

  // doing the task
  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');

      // Show a notification only if the newTask is not empty
      toast.success('Task Added successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      // Optionally, you can show a different notification or handle the case when newTask is empty
      toast.warning('Please enter a valid task!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  // deleting the task
  const deleteTask = (taskId) => {
    const isConfirmed = window.confirm('Are you sure want to delete the task?');
    if (isConfirmed) {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      // Show a notification
      toast.success('Task deleted successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  // Toggling the task
  const toggleCompleted = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const completedMessage = updatedTasks.find((task) => task.id === taskId).completed
      ? 'Task Completed successfully!'
      : 'Task Undone successfully!';

    toast.success(completedMessage, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  // Editing the task

  const startEditing = (taskId, taskText) => {
    setEditTask(taskId);
    setEditedTaskText(taskText);
  };

  // Saving the task
  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editTask ? { ...task, text: editedTaskText } : task
    );

    // Check if any task was actually edited
    const isTaskEdited = tasks.some(
      (task) => task.id === editTask && task.text !== editedTaskText
    );

    if (isTaskEdited) {
      setTasks(updatedTasks);
      setEditTask(null);
      setEditedTaskText('');

      // Show a notification for successful edit
      toast.success('Task Edited successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      // Optionally, you can show a warning or info message if no actual edit was made
      toast.info('No changes made to the task.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center sm">Todo List</h1>
      <div className="row mt-3">
        <div className="col-sm-6 offset-md-3">
         <div className="input-group mb-3">
            <form onSubmit={handleSubmit} className="d-flex">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                style={{ width: '550px'}}
              />
              <div className="input-group-append" style={{ marginLeft: '8px' }}></div>
             <button type="submit" className="btn btn-primary btn-sm align-items-center" style={{ height: '40px' }}>
               Add Task
             </button>
            </form>
          </div>
          <ul className="list-group">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  task.completed ? 'list-group-item-success' : ''
                }`}
              >
                {editTask === task.id ? (
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-success"
                        onClick={saveEditedTask}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                      }}
                    >
                      {task.text}
                    </span>
                    <div>
                      <button
                        className="btn btn-success btn-sm mx-2"
                        onClick={() => toggleCompleted(task.id)}
                      >
                        {task.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button
                        className="btn btn-warning btn-sm mx-2"
                        onClick={() => startEditing(task.id, task.text)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

/*<div className="input-group-append" style={{ marginLeft: '8px' }}>
              <button type="submit" className="btn btn-primary btn-sm align-items-center" style={{ height: '40px' }}></button>*/