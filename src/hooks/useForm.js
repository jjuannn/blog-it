import {useReducer} from "react"
import createPost from "../services/createPost.js"

const ACTIONS = {
    SENDING: "SENDING",
    FAILURE: "FAILURE",
    SUCCESS: "SUCCESS"
}

function postReducer(state, action){
    const {type, payload} = action

    switch(type){
        case ACTIONS.SENDING: 
            return {...state, success: false, sending: true, error: null }
        case ACTIONS.FAILURE:
            return {...state, success: false, sending: false, error: payload}
        case ACTIONS.SUCCESS:
            return {...state, success: true, sending: false, error: null}
        default: 
            return state
    }
}

const initialValues = {
    success: false,
    sending: false,
    error: null
}

export default function useForm(){
    const [formState, dispatch] = useReducer(postReducer, initialValues)

    const publishPost = (postData) => {
        dispatch({type: ACTIONS.SENDING})
        createPost(postData)
        .then(res => {
            console.log(res)
            dispatch({type: ACTIONS.SUCCESS})
        }).catch(err => {
            dispatch({type: ACTIONS.FAILURE, payload: err})
        })
    }
    
    return {
        publishPost,
        success: formState.success,
        sending: formState.sending,
        error: formState.error
    }

}