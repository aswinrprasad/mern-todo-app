
import axios from 'axios'
import React, { useState } from 'react'
//import taskData from './TaskData'

// Component used to input tasks/ submit tasks
function GetTask(props){    

    // fieldVal is the value state used in input field of todo tasks
    const [fieldVal, setFieldVal] = useState("")
    
    // handleChange function is used to set the fieldVal dynamically as input field changes
    const handleChange = (event) => {
        setFieldVal(event.target.value)
    }

    //handleSubmit function is used to store the task inputted when submit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault()

        alert('A to-do task was submitted : ' + fieldVal)
        
        // Checking and generating a random ID value which is not already present in the User's tasks array
        let temp = Math.floor((Math.random() * 100) + 1)
        let id_val=0
        props.tasks.forEach(task => {
            if(task.id === temp)
                temp = Math.floor((Math.random() * 100) + 1)
            else 
                id_val = temp
        })

        // Storing the value/task object into the tasks array of the user which is recieved with props
        let temp_task = {
            id_val:id_val,
            desc:fieldVal,
            completed:false
        }
        props.tasks.push(temp_task)

        axios.put(`http://localhost:5000/api/users/${props.user.id}/addtask`, temp_task)
            .then(console.log(`The task has been pushed into mongo : ${JSON.stringify(temp_task)}`))
            .catch(err => console.log(err))

        props.setTask([
            ...props.tasks
            
        ])
        
        // Set fieldVal to empty string after task submission
        setFieldVal("")
    }

    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input id="task" type="text" placeholder="Enter a to-do task" value={fieldVal} onChange={handleChange}/><br/><br/>
                <input className="btn btn-info" type="submit" value="Submit"/>
                <hr style={{color:'black'}}/>
            </form>
            <br/>

        </div>
    )
    
}

export default GetTask