import React, { useState } from 'react'
import '../static/styles/Login.css'
import { Link } from 'react-router-dom'
import todoBG from '../static/images/todo-bg.jpg'
import axios from 'axios'
// Register Component which is displayed when clicking on Register Nav item which makes use of routes.
function Register({ userList, addUser }) {

    // All fields in the register form are initialized to a null string state at first
    const [nameField, setNameField] = useState("")
    const [emailField, setEmailField] = useState("")
    const [mobileField, setMobileField] = useState("")
    const [passwordField, setPasswordField] = useState("")
    const [cpwField, setCpwField] = useState("")

    // Styling for all field validations
    const [emailBoxSyle, setEmailBoxStyle] = useState({
        borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const [mobileBoxSyle, setMobileBoxStyle] = useState({
        borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const [pwBoxStyle, setPwBoxStyle] = useState({
        borderColor: "",
        ':focus': {
            color: "red"
        }
    })


    // All field input change event handler functions are defined below

    // Handler for nameField change
    const nameChange = (event) => {
        setNameField(event.target.value)
    }

    // Handler for emailField change and it dynamically validates and styles the input field
    const emailChange = (event) => {
        setEmailField(event.target.value)

        // emailField should match the given regex pattern which is abc@mail.com
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(event.target.value)) {
            setEmailBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setEmailBoxStyle({ borderColor: "red" })
        }
    }

    // Handler for mobileField change and it dynamically validates and styles the input field
    const mobileChange = (event) => {
        setMobileField(event.target.value)

        // Checking if mobile number is 10 digits or not and styling the mobile field
        if (event.target.value.length === 10 && event.target.value[0] !== "0") {
            setMobileBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setMobileBoxStyle({ borderColor: "red" })
        }
    }

    const passwordChange = (event) => {
        setPasswordField(event.target.value)

        /* Checking if password is of length 8 and if it is the same as confirm password field 
           and styling the mobile field */
        if (event.target.value === cpwField && event.target.value.length >= 8) {
            setPwBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setPwBoxStyle({ borderColor: "red" })
        }
    }

    const cpwChange = (event) => {
        setCpwField(event.target.value)

        /* Checking if password is of length 8 and if it is the same as confirm password field 
           and styling the mobile field */
        if (event.target.value === passwordField && event.target.value.length >= 8) {
            setPwBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setPwBoxStyle({ borderColor: "red" })
        }
    }

    // function to handle the submit button click, once all inputs are made
    const handleSubmit = (event) => {
        const crypto = require('crypto');
        event.preventDefault()

        // Loop through the userList and check if the submitted email already exists 
        for (let u of userList) {
            if (u.email === emailField) {
                alert(`The user email ${emailField} already exists in the database! Try again with a different email.`)
                setEmailField("")
                setEmailBoxStyle({ borderColor: "red" })
                return false
            }
            if (u.mobile === mobileField) {
                alert(`The user mobile number ${mobileField} already exists in the database! Try again with a different mobile number.`)
                setMobileField("")
                setMobileBoxStyle({ borderColor: "red" })
                return false
            }

        }

        // Generating a random id value for the new user which does not already exist
        let id_val = Math.floor((Math.random() * 100) + 1)
        for (const user in userList) {
            if (user.id === id_val) {
                id_val = Math.floor((Math.random() * 100) + 1)
            }
        }

        // Storing the value in temporary user object to push it into the userList
        let temp = {
            id: id_val,
            name: nameField,
            email: emailField,
            mobile: mobileField,
            // Hashing the password for security. sha1 hashing used.
            password: crypto.createHash('sha1').update(passwordField).digest('hex'),
            tasks: [],
            logged: false
        }
        axios.post("http://localhost:5000/api/users/adduser", temp)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        addUser([
            ...userList,
            temp
        ])

        alert(`User with email: ${emailField} Added!`)

        // Clearing all the fields and inline styles set after user is inserted into the database
        setNameField("")
        setEmailField("")
        setEmailBoxStyle({
            borderColor: "",
            ':focus': {
                color: "red"
            }
        })
        setMobileField("")
        setMobileBoxStyle({
            borderColor: "",
            ':focus': {
                color: "red"
            }
        })
        setPasswordField("")
        setCpwField("")
        setPwBoxStyle({
            borderColor: "",
            ':focus': {
                color: "red"
            }
        })
    }

    return (
        <div id="regrow" className="row">
            <div className="col-sm-9">
                <img className="image" src={todoBG} alt="#" />
            </div>
            <div className="col-sm-3 login">
                <form onSubmit={handleSubmit} className="login-container">
                    <h4 style={{paddingTop: "5%", color:"cadetblue"}}>REGISTER</h4>
                    <section>
                        <i>Name</i> <br />
                        <input name="name"
                            type="text"
                            onChange={nameChange}
                            value={nameField}
                            placeholder="Enter your name"
                            required />
                    </section>
                    <section>
                        <i>Email</i> <br />
                        <input name="email"
                            type="text"
                            style={emailBoxSyle}
                            onChange={emailChange}
                            value={emailField}
                            placeholder="Enter your email id"
                            required />
                    </section>
                    <section>
                        <i>Mobile</i> <br />
                        <input name="mobile"
                            type="text"
                            style={mobileBoxSyle}
                            onChange={mobileChange}
                            value={mobileField}
                            placeholder="Enter your mobile number"
                            required />
                    </section>
                    <section>
                        <i>Password</i> <br />
                        <input name="password"
                            style={pwBoxStyle}
                            onChange={passwordChange}
                            value={passwordField}
                            type="password"
                            placeholder="Enter your password"
                            required />
                    </section>
                    <section>
                        <i>Confirm Password</i> <br />
                        <input name="cpw"
                            style={pwBoxStyle}
                            onChange={cpwChange}
                            value={cpwField}
                            type="password"
                            placeholder="Enter your password"
                            required />
                    </section>
                    <section style={{textAlign: "center"}}>
                        <Link to="/">
                            <label id="go-to-login">Already have an account ? <br />
                            Click here to Login.</label> <br />
                        </Link>
                    </section>
                    <section id="login-btn-container">
                        <input className="login-btn" type="submit" value="Register" />
                    </section>
                </form>
            </div>
        </div>
    )
}

export default Register