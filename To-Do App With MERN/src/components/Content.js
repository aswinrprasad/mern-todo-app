import React, { useEffect, useState } from 'react'
import './../static/styles/Content.css'
//import {GetTask} from './GetTask'

//import taskData from './TaskData'
import TaskContainer from './TaskConatiner'
import axios from 'axios'

function Content(){
    
    const [tasks, setTask] = useState([])

    useEffect(() => {
        let initTask = []
        axios.get("http://192.168.18.127:5000/tasks").then(res =>{
            initTask = res.data.map( task => task)
            setTask(initTask)
        })
        .catch(err => console.log(err))
    }, [])
    
    //console.log(tasks)
    
    const handleChange = (id) => {
        setTask( () => {
            const updatedTasks = tasks.map(task => {
                if(task.id_val === id){
                    task.completed = task.completed ? false : true
                    axios.put(`http://192.168.18.127:5000/tasks/updatecheck/${id}`, task)
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

        axios.delete(`http://192.168.18.127:5000/tasks/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        
    }

    const updateTask = (id, desc) => {
        setTask( () => {
            const updatedTasks = tasks.map(task => {
                if(task.id_val === id){
                    task.desc = desc
                }
                axios.put(`http://192.168.18.127:5000/tasks/update/${id}`, {desc:desc})
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

    
    return (
        <div style={inline_style_container}>
            <h2 style={inline_style}>Aqua if it's an odd minute, black if it's an even minute.</h2>
            <div className="container">  
                <TaskContainer tasks={tasks} setTask={setTask} handleChange={handleChange} deleteTask={deleteTask} updateTask={updateTask}/> 
            </div>
        </div>
    )
    //isLoading={this.state.isLoading}/>
    
}

export default Content