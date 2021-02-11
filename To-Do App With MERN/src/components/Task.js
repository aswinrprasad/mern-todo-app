import React, { useState } from 'react'
import './../static/styles/Content.css'
import UpdateForm from './UpdateForm'

function Task(props){

    const [uClicked, setUClicked] = useState(0)

    let inline_text_deco
    if(props.task.completed === true)
        inline_text_deco = {textDecoration: "line-through", color: "#cdcdcd"}
    else
        inline_text_deco = {textDecoration: "none"}

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
            <UpdateForm uClicked={uClicked} setUClicked={setUClicked} id={props.task.id_val} updateTask={props.updateTask}/>
        </div>
    )
}

export default Task