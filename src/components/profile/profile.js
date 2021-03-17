import React from "react"
import "./profile.css"
import Post from "../post/post"



export default function Profile({user, posts}){
    return (
        <>
        <div className="profile">
            <div className="profile-header">
                <img className="profile-picture" src={user.picture}/>
                <p className="profile-name">{user.username}</p>
            </div>
        </div>
        <h3 className="posts-title">{user.username} posts: </h3>
        <div className="user-posts">
            {posts.map((post, i) => {
                return <Post {...post} key={i}/>
            })}
        </div>
        </>

    )
}