import React, { useState } from 'react'
import '../static/styles/Login.css'
import todoBG from '../static/images/todo-bg.jpg'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

// Login Component which is displayed in the home page
function Login({ userList, addUser, userPos, setUserPos }) {

    /* emailField and passwordField to be used to dynamically show in the input 
       fields respectively using value property in HTML */
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    // A state variable used for styling on email validations
    const [emailBoxSyle, setEmailBoxStyle] = useState({
        borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    // A state variable used for styling on password validations
    const [passwordBoxSyle, setPasswordBoxStyle] = useState({
        borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    // Check if email is in the format of abc@mail.com and style the field accordingly
    const emailChange = (event) => {
        setEmailField(event.target.value)
        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(event.target.value)) {
            setEmailBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setEmailBoxStyle({ borderColor: "red" })
        }
    }

    // Check if password is of length 8 or above and style the field accordingly
    const passwordChange = (event) => {
        setPasswordField(event.target.value)

        if (event.target.value.length >= 8) {
            setPasswordBoxStyle({ borderColor: "cadetblue" })
        }
        else {
            setPasswordBoxStyle({ borderColor: "red" })
        }
    }

    /* useHistory() is used here to redidirect to /todohome which uses Routes once the login 
       credentials are validated */
    const history = useHistory()

    // handleSubmit() handles the input and logs the user in to the todo home page
    const handleSubmit = (event) => {
        event.preventDefault()
        const crypto = require('crypto');
        let f_email = 0, f_pass = 0, pos = 0
        addUser(() => {
            const u_l = userList.map((user) => {

                // If both email and password are correct => f_email = 1, f_pass = 1
                if (user.email === emailField) {
                    f_email = 1

                    // The user password are stored as sha1 hashed formats
                    if (user.password === crypto.createHash('sha1').update(passwordField).digest('hex')) {
                        f_pass = 1
                        user.logged = true
                        axios.put("http://localhost:5000/api/users/" + user.id + "/login", { logged: true })
                            .then(res => console.log("Login Successful! =>" + user.name))
                            .catch(err => console.log(err))
                        localStorage.setItem("uid", user.id)
                        localStorage.setItem("logged", true)
                        setUserPos(pos)
                    }
                }
                pos += 1
                return user
            })
            return u_l
        })

        // Checking the flags and displaying proper output
        if (f_email === 1 && f_pass === 1) {
            alert('User Logged In')
            history.push("/todohome")
        }
        else if (f_email === 1 && f_pass === 0) {
            alert('Password incorrect')
            setPasswordField("")
            setPasswordBoxStyle({ borderColor: "red" })

        }
        else {
            alert('Password or Email are incorrect')
            setEmailField("")
            setEmailBoxStyle({ borderColor: "red" })
            setPasswordField("")
            setPasswordBoxStyle({ borderColor: "red" })

        }
    }

    return (
        <div id="logrow" className="row">
            <div className="col-sm-9">
                <img className="image" src={todoBG} alt="#" />
            </div>
            <div className="col-sm-3 login">    
                <form onSubmit={handleSubmit} className="login-container">
                    <h4 style={{paddingTop: "5%", color:"cadetblue"}}>LOGIN</h4>
                    <section>
                        <i>Email</i> <br />
                        <input name="email"
                            style={emailBoxSyle}
                            value={emailField}
                            onChange={emailChange}
                            type="text"
                            placeholder="Enter your email id"
                            required />
                    </section>
                    <section>
                        <i>Password</i> <br />
                        <input name="password"
                            style={passwordBoxSyle}
                            value={passwordField}
                            onChange={passwordChange} type="password"
                            placeholder="Enter your password"
                            required />
                    </section>
                    <section id="login-btn-container">
                        <input className="login-btn" type="submit" value="Login" />
                    </section>
                </form>
            </div>
        </div>
    )
}
export default Login