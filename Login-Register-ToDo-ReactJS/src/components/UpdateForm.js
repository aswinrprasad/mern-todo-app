import React, { useState } from 'react'

function UpdateForm(props){

    const [fieldVal, setFieldVal] = useState("")
    const handleChange = (event) => {
        setFieldVal(event.target.value)
    }

    const handleSubmit = () => {
        alert('A to-do task was submitted : ' + fieldVal)
        
        props.updateTask(props.id, fieldVal)
        props.setUClicked(0)
    }
    if(props.uClicked === 1){
        return(
            <div>
                <input placeholder="Enter to-do task to update" type="text" value={fieldVal} onChange={handleChange}/> <br/>
                <input style={{marginTop:"4px"}} className="btn btn-sm btn-info" type="submit" value="Update" onClick={handleSubmit}/>
            </div>
        )
    }

    return <div></div>
}

export default UpdateForm