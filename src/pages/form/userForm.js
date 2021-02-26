import React from "react"
import UserForm from "../../components/userForm/userForm"
import "./userForm.css"
import { useParams } from "react-router-dom"

export default function UserFormPage(){
    const { action } = useParams()
    return(
        <div className="userform-page">
            <div className="form-title">
                <strong className="title-text">{ action === "login" ? "LogIn" : "Register"} in BlogIt!</strong>
            </div>
            <div>
            <UserForm />
            </div>
        </div>
    )
}