import React, { useEffect, useRef, useState } from "react"
import {Redirect, useParams} from "react-router-dom"
import "./userForm.css"
import useUser from "../../hooks/useUser"
import LoadingSpinner from "../loadingSpinner/loadingSpinner"

export default function UserForm(){
    const { action } = useParams()
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const { login, isLogged, error, loading} = useUser()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if(isLogged){ 
            setRedirect(true)
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
        let formData = new FormData(formRef.current)
        
        if(action === "register"){
            const file = imgRef.current.files[0]
            const fileUrl = URL.createObjectURL(file)
            
            formData.append("picture", fileUrl)
        }

        login(action, formData)
    }      

    const imgRef = useRef(null)
    const formRef = useRef(null)

    if(loading){
        return <LoadingSpinner/>
    }else{
        return(
            <form ref={formRef} className="user-form" encType="multipart/form-data" onSubmit={handleSubmit}>
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
                { action === "login" ? "" : 
                    <input required
                    className="form-input" 
                    ref={imgRef} 
                    type="file" 
                    name="picture"
                    /> 
                }
                {error ? <p className="error-message">{error.message}</p> : ""}
                {redirect && <Redirect to="/" />}
                <button className="form-buttons" type="submit">Submit</button>
            </form>
        )
    }
}
