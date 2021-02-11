import React from 'react'
import '../static/styles/Home.css'
import Login from './Login'
import Register from './Register'
import {Route, Switch} from 'react-router-dom'

function Home({userList, addUser, userPos, setUserPos}){
    return (
        <div className="home-body">
            <Switch>
                <Route path="/" exact render={() => <Login userList={userList} addUser={addUser} userPos={userPos} setUserPos={setUserPos}/>} />
                <Route path="/register" exact render={() => <Register userList={userList} addUser={addUser}/> } />
            </Switch>
        </div>
    )
}

export default Home
