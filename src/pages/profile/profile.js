import React from "react"
import Profile from "../../components/profile/profile"
import usePosts from "../../hooks/usePosts"
import getProfile from "../../services/getProfile"
import {useParams} from "react-router-dom"
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner"
import "./profile.css"

export default function ProfilePage(){
    const { id } = useParams()
    const { data, loading, error} = usePosts(getProfile, id)
    
    if(loading){
        return <LoadingSpinner/>
    }
    if(error){
        return <p className="error-message">{error.message}</p>
    }
    if(data){
        return <Profile {...data} />
    }
    return null
}