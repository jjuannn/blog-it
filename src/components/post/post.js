import React, { useState } from "react"
import "./post.css"
import useUser from "../../hooks/useUser"
import deletePost from "../../services/deletePost"
import { useHistory } from "react-router-dom"


export default function Post({title, text, picture, id, author_id, author_username, author_picture}){
    const { data } = useUser()
    const history = useHistory()
    const [error, setErrors] = useState("")

    const handleDelete = async(id) => {
        try {
            await deletePost(id)
            history.go(0)
        } catch (err) {
            setErrors(err.message)
        }
    }

    return(
        <div className="post-card">
            <div className="post-header">
                <img className="author-img" src={author_picture} alt="" />
                <strong style={{marginLeft: "10px"}}>{author_username}</strong>
                { data && data.id ? (data.id === author_id ? 
                    <p onClick={() => { handleDelete(id)}} className="delete-post"><i class="fas fa-times"></i></p>
                    : ""
                ) : ""}
            </div>
            <div className="post-body">
                <p className="post-title">
                    <strong>
                    {title}
                    </strong>
                </p>
                <p className="post-text">     
                    {text}
                </p>
                {picture ? <img className="post-img" alt="" src={picture}/> : ""}
                {error ? <p class="text-error">{error}</p> : ""}
            </div>
        </div>
    )
}