import GetTask from './GetTask'
import './../static/styles/Content.css'
import Task from './Task'

let TaskContainer = (props) => {
    const tc = props.tasks.map(task => {return (<div><Task key={task.id_val} task={task} tasks={props.tasks} setTask={props.setTask} handleChange={props.handleChange} deleteTask={props.deleteTask} updateTask={props.updateTask}/><hr/></div>)})
    return(
        <div className="task-container">
            <GetTask tasks={props.tasks} setTask={props.setTask}/>                     
            <ul>
                {tc}
            </ul>
        </div>
    )
    
}

export default TaskContainer