import React from 'react'
import '../static/styles/Navbar.css'
import { Link } from 'react-router-dom'
function Navbar({isLogged, setUser}){


    let navComp;
    if(isLogged !== true){
        navComp = (
            <div className="links">
                <Link to="/register" style={{textDecoration:"none", color:"lightcyan"}}>
                    <h4 id="reg">Register</h4>
                </Link>
                <h4 id="contact">Contact Us</h4>
            </div>
        )
    }
    else {
        navComp = (
            <div className="links">
                <Link to="/" style={{textDecoration:"none", color:"lightcyan"}}>
                    <h4 id="reg" onClick={()=>setUser()}>Logout</h4>
                </Link>
            </div>
        )
    }
    
    return (
        <header>
            <div className="title">
                <h1>To-do App Login</h1>
            </div>
            {navComp}
        </header>
    )
}
export default Navbar