import React from 'react'
import MyFooter from './MyFooter'
import MyHeader from './MyHeader'
import Content from './Content'
import './../static/styles/MyApp.css'

function MyApp(){
    return (
        <div className="app-body">
            <MyHeader />
            <Content />
            <MyFooter />
        </div>
    )
}

export default MyApp