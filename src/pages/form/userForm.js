import React from "react"
import UserForm from "../../components/userForm/userForm"
import "./userForm.css"

export default function UserFormPage(){
    return(
        <div className="userform-page">
            <div className="form-title">
                <strong className="title-text">Get in</strong>
            </div>
            <div>
            <UserForm/>
            </div>
        </div>
    )
}