import React from "react"
import NewPost from "../../components/new/newPost"
import "./newPost.css"

export default function newPostPage(){
    return (
        <>
        <p className="create-page-title">
            Create post...
        </p>
        <NewPost/>
        </>
    )
}
