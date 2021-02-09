import React from 'react'
import './../static/styles/Content.css'
import TaskContainer from './TaskConatiner'
// import axios from 'axios'


function TodoHome({tasks, setTask}){

    const handleCheck = (id) => {
        const updatedTasks = tasks.map(task => {
            if(task.id_val === id){
                task.completed = !task.completed 
                // axios.put(`http://192.168.18.127:5000/tasks/updatecheck/${id}`, task)
                // .then(res => console.log(res))
                // .catch(err=> console.log(err))
            }
            return task
        })
        return updatedTasks
    }

    const handleChange = (id) => {
        setTask(handleCheck(id))
    }

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => {
            return task.id_val !== id
        })
        return updatedTasks
    }
    
    const deleteTask = (id) => {
        console.log(id)
        
        setTask(handleDelete(id))

        // axios.delete(`http://192.168.18.127:5000/tasks/delete/${id}`)
        //     .then(res => console.log(res))
        //     .catch(err => console.log(err))
        
    }

    const handleUpdate = (id, desc) => {
        const updatedTasks = tasks.map(task => {
            if(task.id_val === id){
                task.desc = desc
            }
            // axios.put(`http://192.168.18.127:5000/tasks/update/${id}`, {desc:desc})
            //     .then(res => console.log(res))
            //     .catch(err=> console.log(err))
            return task
        })
        return updatedTasks
    }

    const updateTask = (id, desc) => {
        setTask(handleUpdate(id, desc))
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

export default TodoHome