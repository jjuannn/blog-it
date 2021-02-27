import React, { useState } from "react"
import axios from "axios"
import {useParams } from "react-router-dom"
import "./userForm.css"

export default function UserForm(){
    const { action } = useParams()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("") 

    // MOVER A UN SERVICIO APARTE
    // MOVER A UN SERVICIO APARTE
    const setUsernameValue = (e) => {
        setUsername(e.target.value)
    }   

    const setPasswordValue = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {username, password}
        console.log(data)
        axios({
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            url: `http://localhost:8080/users/${action}`,
            data: data
        }).then(res => console.log(res))
        .catch(err => {console.log(err.response)});
    }

    return(
        <form className="user-form" encType="application/x-www-form-urlencoded" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input className="form-input" autoComplete="username" value={username} onChange={setUsernameValue} name="username" type="text"/>
            <label htmlFor="password">Password</label>
            <input className="form-input" autoComplete="current-password" value={password} onChange={setPasswordValue} name="password" type="password"/> 
            <button className="form-buttons" type="submit">Submit</button>
        </form>
    )
}