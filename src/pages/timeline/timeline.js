import React from "react"
import Post from "../../components/post/post"
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import "./timeline.css"
import usePosts from "../../hooks/usePosts"
import useUser from "../../hooks/useUser"
import getPosts from "../../services/getPosts"

export default function Timeline(){
    const { isLogged } = useUser()
    const { loading, data, error } = usePosts(getPosts)
    
    if(loading){
        return <LoadingSpinner/>
    }
    if(data){
        return (    
            <>  
                <button className="new-post-button">
                    <a className="button-text" href={isLogged ? "/posts/new" : "/users/login"}>
                        New Post
                    </a>
                </button>
                <h3 className="timeline-title">What's happening... </h3>
                {error && <p>FAILED...</p>}
                <div className="post-container">
                    {data.map((post, i ) => {
                        return <Post {...post} key={i}/>
                    })}
                </div>
            </>
    )}

    return null
}