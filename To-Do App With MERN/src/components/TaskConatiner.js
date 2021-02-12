import GetTask from './GetTask'
import './../static/styles/Content.css'
import Task from './Task'

function TaskContainer(props) {
    
    const tc = props.tasks.map(task => {return (<div key={task.id_val}><Task task={task} tasks={props.tasks} setTask={props.setTask} handleChange={props.handleChange} deleteTask={props.deleteTask} updateTask={props.updateTask}/><hr/></div>)})
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