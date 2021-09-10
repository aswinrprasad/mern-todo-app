import React, { useState } from 'react'
import Aux from '../hoc/Auxiliary'

// UpdateForm component which is displayed when update icon besides the task is clicked.
function UpdateForm(props){

    // fieldVal is a state variable to handle changes to update field for description update
    const [fieldVal, setFieldVal] = useState("")

    // handleChange() dynamically changes the value of the fieldVal
    const handleChange = (event) => {
        setFieldVal(event.target.value)
    }

    /* handleSubmit() updates the task once sumbit button is pressed and then sets 
       uClicked to 0 to make the update field disappear */
    const handleSubmit = () => {
        alert('A to-do task was submitted : ' + fieldVal)
        
        props.updateTask(props.id, fieldVal)
        props.setUClicked(0)
    }

    // Check if uClicked is 1 and then display the update description field
    if(props.uClicked === 1){
        // return auxiliary component as it does not have any other properties
        return(
            <Aux>
                <input placeholder="Enter to-do task to update" type="text" value={fieldVal} onChange={handleChange} required/> <br/>
                <input style={{marginTop:"4px"}} className="btn btn-sm btn-info" type="submit" value="Update" onClick={handleSubmit}/>
            </Aux>
        )
    }
    return <div></div>
}

export default UpdateForm