import React, {useState, useRef, useEffect} from "react"
import useUser from "../../hooks/useUser"
import "./newPost.css"
import { Redirect } from "react-router-dom"
import useForm from "../../hooks/useForm"
import LoadingSpinner from "../loadingSpinner/loadingSpinner"

export default function NewPost(){
    const { isLogged, data } = useUser()
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const inputRef = useRef(null)
    const formRef = useRef(null)
    const [redirect, setRedirect] = useState(false)
    const [successRedirect, setSuccessRedirect ] = useState(false)
    const { publishPost, sending, error, success} = useForm()

    useEffect(() => {
        if(success){
            setSuccessRedirect(true)
        }
    }, [success])


    const setTitleValue = (e) => {
        setTitle(e.target.value)
    }

    const setTextValue = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!isLogged){
            setRedirect(true)
        }

        let formData = new FormData(formRef.current)
        const { id } = data
        formData.append("author_id", id)
        if(inputRef.current.files[0]){
            const file = inputRef.current.files[0]
            const fileUrl = URL.createObjectURL(file)
            formData.append("picture", fileUrl)
        }

        publishPost(formData)
    }

    if(sending){
        return <LoadingSpinner/>
    } else {
    return(
        <>
            <form ref={formRef} className="post-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input required 
                    value={title} 
                    onChange={setTitleValue} 
                    name="title" 
                    maxLength="30" 
                    className="form-input" 
                    type="text" 
                />
                <label htmlFor="text">Text</label>
                <textarea required  
                    value={text}
                    onChange={setTextValue}
                    name="text" 
                    maxLength="200"
                    className="form-input text-area"
                    rows="4" cols="50" 
                />
                <label htmlFor="picture">Image</label>
                <input ref={inputRef} name="picture" className="form-input" type="file" />
                <button className="form-buttons">Publish</button>
                {redirect && <Redirect to="/users/login" />}
                {successRedirect && <Redirect to="/posts" />}
                {error ? <p className="error-message">{error.message}</p> : ""}
            </form>
        </>
    )}
}