
import axios from 'axios'
import React, { useState } from 'react'
import Aux from '../hoc/Aux'

function GetTask(props){    

        
    const [fieldVal, setFieldVal] = useState("")
        //this.handleChange = this.handleChange.bind(this)
        //this.handleSubmit = this.handleSubmit.bind(this)
    
    const handleChange = (event) => {
        setFieldVal(event.target.value)
    }

    const handleSubmit = (event) => {
        alert('A to-do task was submitted : ' + fieldVal)
        
        let temp = Math.floor((Math.random() * 100) + 1)
        let id_val=0
        props.tasks.forEach(task => {
            if(task.id === temp)
                temp = Math.floor((Math.random() * 100) + 1)
            else 
                id_val = temp
        })
        let temp_task = {
            id_val:id_val,
            desc:fieldVal,
            completed:false
        }

        props.tasks.push(temp_task)

        axios.post("http://0.0.0.0:5000/tasks/add", temp_task)
            .then(console.log(`The task has been pushed into mongo : ${JSON.stringify(temp_task)}`))
            .catch(err => console.log(err))

        props.setTask([
            ...props.tasks
            
        ])
        // this.props.tasks.push({
        //     desc: this.state.value,
        //     completed: false
        // })
        // this.setState( prevState => {
        //     prevState.td.push({
        //         id: id_val,
        //         desc:this.state.value,
        //         completed:false
        //     })
        //     return {
        //         td: prevState.td
        //     }
        // })
        setFieldVal("")
        event.preventDefault()
        console.log(props.tasks)
    }

    
    return(
        <Aux>
            <form onSubmit={handleSubmit}>
                <input id="task" type="text" placeholder="Enter a to-do task" value={fieldVal} onChange={handleChange}/><br/><br/>
                <input className="btn btn-info" type="submit" value="Submit"/>
                <hr style={{color:'black'}}/>
            </form>
            <br/>

        </Aux>
    )
    
}

export default GetTask
