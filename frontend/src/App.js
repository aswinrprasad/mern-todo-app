import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import userDets from './components/userList'
import TodoHome from './components/TodoHome'
import { Link } from 'react-router-dom'
import axios from 'axios'

// The component at the highest level. Manages base state.
function App() {

  // userList is to staore all the users from the database
  const [userList, addUser] = useState(userDets)

  // useEffect() used to load the usedetails from the db to userList state variable
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/").then(res => {
      //console.log(JSON.stringify(res.data))
      if(res.data.length>0)
        addUser([...res.data])
    })
      .catch(err => console.log(err))
    console.log("Users loaded..")
  }, [])

  const [userPos, setUserPos] = useState(0)

  // setTask function is to add tasks to a specific user objects tasks field.
  const setTask = (tasks) => {
    let pos = 0
    addUser(() => {
      const newUser = userList.map(user => {
        if (pos === userPos) {
          user.tasks = tasks
        }
        pos += 1
        return user
      })
      return newUser
    })
  }

  // setUser() checks which user is logged in and sets isLogged and returns the modified userList
  const setUser = () => {
    let pos = 0
    addUser(() => {
      const newUser = userList.map(user => {
        if (pos === userPos) {
          const temp = !user.logged
          user.logged = temp
          localStorage.setItem("uid", user.id)
          localStorage.setItem("logged", false)
          axios.put("http://localhost:5000/api/users/" + user.id + "/logout", { logged: temp })
        }
        pos += 1
        return user
      })

      return newUser
    })
  }

  /* Conditional rendering for user being logged in or not. Displays TodoHome component if logged in, 
     else displays Error message and prompts to login again. */
  return (
    <Router>
      <div className="main">
        <Navbar logged={userList[userPos].logged} setUser={setUser} />

        <Home userList={userList} addUser={addUser} userPos={userPos} setUserPos={setUserPos} setTask={setTask} />
        <Switch>
          <Route path="/todohome" exact render={() => {
            if (userList[userPos].logged === true)
              return <TodoHome user={userList[userPos]} tasks={userList[userPos].tasks} setTask={setTask} />
            else
              return (
                <div style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                  <h2>Please Login again</h2>
                  <Link to="/">
                    <input className="btn btn-large btn-info" type="button" value="Login" />
                  </Link>
                </div>
              )
          }} />
          
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
