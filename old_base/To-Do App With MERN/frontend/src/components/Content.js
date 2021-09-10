import React, { useEffect, useState } from 'react'
import './../static/styles/Content.css'
//import {GetTask} from './GetTask'

//import taskData from './TaskData'
import TaskContainer from './TaskConatiner'
import axios from '../hoc/axios'
import axiosErrorHandler from '../hoc/axiosErrorHandler'

function Content(props){
    
    const [tasks, setTask] = useState([])
    
    useEffect(() => {
        axios.get("http://0.0.0.0:5000/tasks").then(res =>{
            setTask([...res.data])
        })
        .catch(err => console.log(err))
        console.log("Content")
    }, [])
    
    //console.log(tasks)
    
    const handleChange = (id) => {
        setTask( () => {
            const updatedTasks = tasks.map(task => {
                if(task.id_val === id){
                    task.completed = task.completed ? false : true
                    axios.put(`http://0.0.0.0:5000/tasks/updatecheck/${id}`, task)
                    .then(res => console.log(res))
                    .catch(err=> console.log(err))
                }
                return task
            })
            return updatedTasks
        })

        
    }

    const deleteTask = (id) => {
        console.log(id)
        
        setTask(() => {
            const updatedTasks = tasks.filter((task) => {
                return task.id_val !== id
            })
            return updatedTasks
        })

        axios.delete(`http://0.0.0.0:5000/tasks/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        
    }

    const updateTask = (id, desc) => {
        setTask( () => {
            const updatedTasks = tasks.map(task => {
                if(task.id_val === id){
                    task.desc = desc
                }
                axios.put(`http://0.0.0.0:5000/tasks/update/${id}`, {desc:desc})
                    .then(res => console.log(res))
                    .catch(err=> console.log(err))
                return task
            })
            return updatedTasks
        })

        
    }

    // componentDidMount() {
    //     setTimeout(() => {
    //         this.setState({
    //             isLoading: false
    //         })
    //     }, 1500);
    // }

    
    let date = new Date()
    let inline_style
    if ((date.getMinutes() % 2) === 0){
        inline_style = { color: "aqua"}
    }
    else{
        inline_style = {color: "black"}
    }


    let inline_style_container = { textAlign: "center" }

    let cont = <TaskContainer tasks={tasks} setTask={setTask} handleChange={handleChange} deleteTask={deleteTask} updateTask={updateTask}/>
    if(props.err){
        cont = props.err
    }
    
    return (
        <div style={inline_style_container}>
            <h2 style={inline_style}>Aqua if it's an odd minute, black if it's an even minute.</h2>
            <div className="container">  
                 {cont}
            </div>
        </div>
    )
    //isLoading={this.state.isLoading}/>
    
}

export default axiosErrorHandler(Content, axios)
