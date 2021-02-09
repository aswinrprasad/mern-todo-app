import React, { useState } from 'react'
import '../static/styles/Login.css'
import {Link} from 'react-router-dom'
import todoBG from '../static/images/todo-bg.jpg'

function Register({userList, addUser}){

    const[nameField, setNameField] = useState("")
    const[emailField, setEmailField] = useState("")
    const[mobileField, setMobileField] = useState("")
    const[passwordField, setPasswordField] = useState("")
    const[cpwField, setCpwField] = useState("")

    const [emailBoxSyle, setEmailBoxStyle] = useState({borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const [mobileBoxSyle, setMobileBoxStyle] = useState({borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const [pwBoxStyle, setPwBoxStyle] = useState({borderColor: "",
    ':focus': {
        color: "red"
    }})

    const nameChange = (event) => {
        setNameField(event.target.value)
    }

    const emailChange = (event) => {
        setEmailField(event.target.value)
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(event.target.value)){
            setEmailBoxStyle({borderColor: "cadetblue"})
        }
        else{
            setEmailBoxStyle({borderColor: "red"})
        }
    }

    const mobileChange = (event) => {
        setMobileField(event.target.value)
        if(event.target.value.length === 10 && event.target.value[0] !== "0"){
            setMobileBoxStyle({borderColor: "cadetblue"})
        }
        else {
            setMobileBoxStyle({borderColor: "red"})
        }
    }

    const passwordChange = (event) => {
        setPasswordField(event.target.value)
        if(event.target.value === cpwField && event.target.value.length >= 8){
            setPwBoxStyle({borderColor: "cadetblue"})
        }
        else{
            setPwBoxStyle({borderColor: "red"})
        }
    }

    const cpwChange = (event) => {
        setCpwField(event.target.value)

        if(event.target.value === passwordField && event.target.value.length >= 8){
            setPwBoxStyle({borderColor: "cadetblue"})
        }
        else{
            setPwBoxStyle({borderColor: "red"})
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault()
        let id_val = Math.floor((Math.random() * 100) + 1)
        for(const user in userList){
            if(user.id === id_val){
                id_val = Math.floor((Math.random() * 100) + 1)
            }
        }
        let temp = {
            id: id_val,
            name: nameField,
            email: emailField,
            mobile: mobileField,
            password : passwordField,
            tasks : [],
            isLogged: false
        }
        addUser([
            ...userList,
            temp
        ])

        alert(`User with email: ${emailField} Added!`)
    }
    
    return (
        <div className="row">
            <div className="col-sm-9">
                <img className="image" src={todoBG} alt="#"/>
            </div>
            <div className="col-sm-3 login">
                <form onSubmit={handleSubmit} className="login-container">
                    <section>
                        <i>Name</i> <br/>
                        <input name="name" type="text" onChange={nameChange} value={nameField} placeholder="Enter your name" required/>
                    </section>
                    <section>
                        <i>Email</i> <br/>
                        <input name="email" type="text" style={emailBoxSyle} onChange={emailChange} value={emailField} placeholder="Enter your email id" required/>
                    </section>
                    <section>
                        <i>Mobile</i> <br/>
                        <input name="mobile" type="text" style={mobileBoxSyle} onChange={mobileChange} value={mobileField} placeholder="Enter your mobile number" required/>
                    </section>
                    <section>
                        <i>Password</i> <br/>
                        <input name="password" style={pwBoxStyle} onChange={passwordChange} value={passwordField} type="password" placeholder="Enter your password" required/>
                    </section>
                    <section>
                        <i>Confirm Password</i> <br/>
                        <input name="cpw" style={pwBoxStyle} onChange={cpwChange} value={cpwField} type="password" placeholder="Enter your password" required/>
                    </section>
                    <section>
                        <Link to="/">
                            <label id="go-to-login">Already have an account ? <br/>Click here to Login.</label> <br/>
                        </Link>
                    </section>
                    <section id="login-btn-container">
                        <input className="login-btn" type="submit" value="Register"/>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Register