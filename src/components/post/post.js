import React from "react"
import "./post.css"
import vertical from "../../assets/1510004.jpg"
import useUser from "../../hooks/useUser"


export default function Post({title, text, image}){
    const { isLogged, data } = useUser()
    
    return(
        <div className="post-card">
            <div className="post-header">
                <img className="author-img" src={isLogged ? data.picture : vertical} alt="" />
                {/* CAMBIAR ESTO DE ARRIBA CUANDO LOS POSTS SEAN BUSCADOS DE LA API */}
                <strong style={{marginLeft: "10px"}}>Username Example</strong>
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
                <img className="post-img" src={image}/>
            </div>
        </div>
    )
}