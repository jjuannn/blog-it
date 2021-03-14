import React, { useState } from "react"
import Post from "../../components/post/post"
import "./timeline.css"
import vertical from "../../assets/1510013.jpg"
import horizontal from "../../assets/1510004.jpg"
import useUser from "../../hooks/useUser"

const list = [
    {
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: vertical 
    },
    {
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: horizontal 
    },
    {
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: vertical 
    },
    {
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: horizontal 
    },{
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: horizontal 
    }
    ,{
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: vertical 
    },{
        title: "Post Title...",
        text: "Hello World! This is a test post! I like tomatoes and playing csgo. Have a nice day!", 
        image: vertical 
    }
]

export default function Timeline({posts}){
    const { isLogged } = useUser()

    return (    
        <>  
            <button className="new-post-button">
                <a className="button-text" href={isLogged ? "/posts/new" : "/users/login"}>
                    New Post
                </a>
            </button>
            <h3 className="timeline-title">What's happening... </h3>
            <div className="post-container">
                {list.map((post, i ) => {
                    return <Post {...post} key={i}/>
                })}
            </div>
        </>
    )
}