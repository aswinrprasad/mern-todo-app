import React from 'react'
import '../static/styles/Home.css'
import {Route, Switch} from 'react-router-dom'
import asyncImportComp from '../hoc/asyncImportComp'
import TodoHome from './TodoHome'

// Asyncrounously load Login & Register components instead of importing it always. -> performance increase 
const Login = asyncImportComp(() => {
    return import('./Login')
})

const Register = asyncImportComp(() => {
    return import('./Register')
})

// Home component where props are accepted as an object which is an es6 feature
function Home({userList, addUser, userPos, setUserPos, setTask}){
   
    /* Displaying home component or Login/Register components using conditional rendering
       checking if the user is logged in or not */
    return (
        <div className="home-body">
            <Switch>
                <Route path="/" exact render={() => {
                    if(userList[userPos].logged === false)
                        return <Login userList={userList} addUser={addUser} userPos={userPos} setUserPos={setUserPos}/> 
                    else 
                        return <TodoHome user={userList[userPos]} tasks={userList[userPos].tasks} setTask={setTask} />
                }}/>
                
                <Route path="/register" exact render={() => {
                    if(userList[userPos].logged === false)
                        return <Register userList={userList} addUser={addUser}/> 
                    else 
                        return <TodoHome user={userList[userPos]} tasks={userList[userPos].tasks} setTask={setTask} />
                }}/> 
            </Switch>
        </div>
    )
}

export default Home
