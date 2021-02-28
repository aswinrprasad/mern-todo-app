import React from 'react'
import './../static/styles/Content.css'
import TaskContainer from './TaskConatiner'
// import axios from 'axios'

// TodoHome component where users tasks are displayed when he/she logs in
function TodoHome({ user, tasks, setTask }) {

    /* Function to handle the task's check box being checked/unchecked -> changes completed 
       field in task object to true/false */
    const handleCheck = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id_val === id) {
                task.completed = !task.completed
            }
            return task
        })
        setTask(updatedTasks)
    }

    // Function to handle the task's delete icon being clicked -> deletes the tasks from the userList
    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => {
            return task.id_val !== id
        })
        setTask(updatedTasks)
    }

    // Function to handle the update of a task after a new description is submitted
    const handleUpdate = (id, desc) => {
        const updatedTasks = tasks.map(task => {
            if (task.id_val === id) {
                task.desc = desc
            }
            return task
        })
        setTask(updatedTasks)
    }

    let inline_style_container = { textAlign: "center" }

    return (
        <div style={inline_style_container}>
            <div className="container">
                <TaskContainer user={user} tasks={tasks} setTask={setTask} handleChange={handleCheck} deleteTask={handleDelete} updateTask={handleUpdate} />
            </div>
        </div>
    )
}

export default TodoHome