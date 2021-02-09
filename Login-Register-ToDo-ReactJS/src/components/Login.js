import React, { useState } from 'react'
import '../static/styles/Login.css'
import todoBG from '../static/images/todo-bg.jpg'
import { useHistory } from 'react-router-dom'

function Login({userList, addUser, userPos, setUserPos}){
    const [emailField, setEmailField] = useState("")
    const [passwordField, setPasswordField] = useState("")

    const [emailBoxSyle, setEmailBoxStyle] = useState({borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const [passwordBoxSyle, setPasswordBoxStyle] = useState({borderColor: "",
        ':focus': {
            color: "red"
        }
    })

    const emailChange = (event) => {
        setEmailField(event.target.value)
        if(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(event.target.value)){
            setEmailBoxStyle({borderColor: "cadetblue"})
        }
        else{
            setEmailBoxStyle({borderColor: "red"})
        }
    }


    const passwordChange = (event) => {
        setPasswordField(event.target.value)

        if(event.target.value.length >= 8){
            setPasswordBoxStyle({borderColor: "cadetblue"})
        }
        else{
            setPasswordBoxStyle({borderColor: "red"})
        }
    }

    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault()
        let f_email = 0, f_pass = 0, pos = 0 
        addUser( () => 
            {
                const u_l = userList.map((user) => {
                console.log(user)
                
                if(user.email === emailField){
                    console.log(user.email)
                    f_email = 1
                    if(user.password === passwordField){
                        console.log(user.password)
                        f_pass = 1
                        user.isLogged = true
                        setUserPos(pos)
                    }
                }
                pos+=1
                return user
            })
            return u_l
        })
        

        if(f_email === 1 && f_pass === 1){
            alert('User Logged In')
            history.push("/todohome")
        }
        else{
            alert('Password or email incorrect')
        }
    } 
    
    return(
        <div className="row">
            <div className="col-sm-9">
                <img className="image" src={todoBG} alt="#"/>
            </div>
            <div className="col-sm-3 login">
                <form onSubmit={handleSubmit} className="login-container">
                    <section>
                        <i>Email</i> <br/>
                        <input name="email" style={emailBoxSyle} value={emailField} onChange={emailChange} type="text" placeholder="Enter your email id"/>
                    </section>
                    <section>
                        <i>Password</i> <br/>
                        <input name="password" style={passwordBoxSyle} value={passwordField} onChange={passwordChange} type="password" placeholder="Enter your password"/>
                    </section>
                    <section id="login-btn-container">
                        <input className="login-btn" type="submit" value="Login"/>
                    </section>
                </form>
            </div>
        </div>
    )
}
export default Login