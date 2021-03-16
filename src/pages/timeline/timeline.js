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
    if(error){
        return <h3 className="timeline-title">
                    {error.message}
                </h3> 
    }
    if(data){
        return (    
            <>  
                <button className="new-post-button">
                    <a className="button-text" href={isLogged ? "/posts/new" : "/users/login"}>
                        New Post
                    </a>
                </button>
                
                {data.length === 0 ? 
                <h3 className="timeline-title">
                    Seems like nothing is happening here... Post something!
                </h3> 
                :
                <>
                <h3 className="timeline-title">What's happening... </h3>
                <div className="post-container">
                    {data.map((post, i ) => {
                        return <Post {...post} key={i}/>
                    })}
                </div> 
                </>
                }
                
            </>
    )}

    return null
}