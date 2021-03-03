import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import "./userForm.css"
import useUser from "../../hooks/useUser"
import LoadingSpinner from "../loadingSpinner/loadingSpinner"
const HOME_URL = "http://localhost:3000/"

export default function UserForm(){
    const { action } = useParams()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const { login, isLogged, error, loading} = useUser()
    
    useEffect(() => {
        if(isLogged){ 
            window.location.replace(HOME_URL)
        }
    }, [isLogged])

    const setUsernameValue = (e) => {
        setUsername(e.target.value)
    }   

    const setPasswordValue = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {username, password}
        login(action, data)
    }      

    if(loading){
        return <LoadingSpinner/>
    }else{
        return(
            <form className="user-form" encType="application/x-www-form-urlencoded" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input required 
                    minLength="4"
                    maxLength="15"
                    className="form-input" 
                    autoComplete="username" 
                    value={username} 
                    onChange={setUsernameValue} 
                    name="username" 
                    type="text"
                />
                <label htmlFor="password">Password</label>
                <input required 
                    minLength="4" 
                    maxLength="15"
                    className="form-input" 
                    autoComplete="current-password" 
                    value={password} 
                    onChange={setPasswordValue} 
                    name="password" 
                    type="password"
                /> 
                {error ? <p className="error-message">{error.message}</p> : ""}
                <button className="form-buttons" type="submit">Submit</button>
            </form>
        )
    }
}
