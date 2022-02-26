import React from 'react'
import './../static/styles/Content.css'
import TaskContainer from './TaskConatiner'
import axios from 'axios'

// TodoHome component where users tasks are displayed when he/she logs in
function TodoHome({ user, tasks, setTask }) {

    /* Function to handle the task's check box being checked/unchecked -> changes completed 
       field in task object to true/false */
    const handleCheck = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id_val === id) {
                const temp = !task.completed
                task.completed = temp
                axios.put(`http://localhost:5000/api/users/${user.id}/updatetaskcheck/${id}`, { completed: temp })
                    .then(res => console.log(`Task with ID : ${id} checked/unchecked.`))
                    .catch(err => console.log(`User ID or Task ID not found. Error occured is : ${err}`))
            }
            return task
        })
        setTask(updatedTasks)
    }

    // Function to handle the task's delete icon being clicked -> deletes the tasks from the userList
    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => {
            if (task.id_val === id)
                axios.delete(`http://localhost:5000/api/users/${user.id}/removetask/${id}`)
                    .then(res => console.log(`Task with ID : ${id} , Description : "${task.desc}" deleted!`))
                    .catch(err => console.log(`User ID or Task ID not found to delete task. Error occured is : ${err}`))
            return task.id_val !== id
        })
        setTask(updatedTasks)
    }

    // Function to handle the update of a task after a new description is submitted
    const handleUpdate = (id, desc) => {
        const updatedTasks = tasks.map(task => {
            if (task.id_val === id) {
                const temp = task.desc
                task.desc = desc
                axios.put(`http://localhost:5000/api/users/${user.id}/updatetaskdesc/${id}`, { desc: desc })
                    .then(res => console.log(`Task with ID : ${id} => Description : "${temp}" modified to "${desc}"`))
                    .catch(err => console.log(`User ID or Task ID not found to update description. Error occured is : ${err}`))
            }
            return task
        })
        setTask(updatedTasks)
    }

    let inline_style_container = { textAlign: "center", height: "100%" }

    return (
        <div style={inline_style_container}>
            <div className="container">
                <TaskContainer user={user} tasks={tasks} setTask={setTask} handleChange={handleCheck} deleteTask={handleDelete} updateTask={handleUpdate} />
            </div>
        </div>
    )
}

export default TodoHome