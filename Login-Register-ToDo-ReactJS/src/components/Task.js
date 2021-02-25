import React, { useState } from 'react'
import './../static/styles/Content.css'
import UpdateForm from './UpdateForm'

/* Component to display a single task which also gives additional functionalities 
   including updating and deleting task object fields */
function Task(props){

    // uClicked is a state variable used to confirm if a task's update icon is clicked or not.
    const [uClicked, setUClicked] = useState(0)

    /* inline_text_deco is a inline styling variable used to style how each task 
       looks when it is completed/checked or not completed */
    let inline_text_deco
    if(props.task.completed === true)
        inline_text_deco = {textDecoration: "line-through", color: "#cdcdcd"}
    else
        inline_text_deco = {textDecoration: "none"}

    // function to change or toggle uClicked variable when update icon is clicked
    const handleUpdateClick = () => {
        if(uClicked === 0)
            setUClicked(1)
        else
            setUClicked(0)
    }

    return (
        <div style={{justifyContent:"center"}}>
            <div className="row">
                <div className="col-sm-3">
                        <input 
                        type="checkbox" 
                        checked={props.task.completed} 
                        onChange={() => props.handleChange(props.task.id_val)}/>
                </div>
                <div className="col-sm-6">
                    <i style={inline_text_deco}>{props.task.desc}</i> 
                </div>
                <div className="col-sm-1">
                    <span className="material-icons" onClick={() => props.deleteTask(props.task.id_val)}>
                        delete
                    </span>
                </div>
                <div className="col-sm-1">
                    <span className="material-icons" onClick={handleUpdateClick}>
                        update
                    </span>
                </div>
            </div>
            {/* When uClicked send to UpdateForm component is one, update form is displayed, else it is not */}
            <UpdateForm uClicked={uClicked} setUClicked={setUClicked} id={props.task.id_val} updateTask={props.updateTask}/>
        </div>
    )
}

export default Task