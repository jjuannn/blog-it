import {useContext, useReducer} from "react"
import {userContext} from "../context/userContext"
import userAuth from "../services/userAuth"

const ACTIONS = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
}

const USER_ACTIONS = {
    LOGIN_OR_REGISTER: "LOGIN_OR_REGISTER",
    LOGOUT: "LOGOUT"
}

function authReducer(state, action){
    const { type, payload } = action

    switch(type){
        case ACTIONS.LOADING: 
            return {...state, loading: true, error: null};
        case ACTIONS.ERROR: 
            return {...state, loading: false, error: payload};
        case ACTIONS.SUCCESS: 
            return {...state, loading: false, error: null}
        default: 
            return state
    }
}

const initialValues = {
    loading: false, 
    error: null
}

export default function useUser(){
    const { userValues, userDispatch} = useContext(userContext)
    const { data } = userValues
    const [ authState, dispatch] = useReducer(authReducer, initialValues)

    const login = (action, data) => {
        dispatch({type: ACTIONS.LOADING})
        userAuth(action, data)
        .then((res) => {
            dispatch({type: ACTIONS.SUCCESS })
            userDispatch({type: USER_ACTIONS.LOGIN_OR_REGISTER, payload: res})
            window.sessionStorage.setItem("user", JSON.stringify(res))
        }).catch(err => {
            dispatch({type: ACTIONS.ERROR, payload: err})
        })
    }

    const logout = () => {
        window.sessionStorage.removeItem("user")
        userDispatch({type: USER_ACTIONS.LOGOUT})
    }
    
    return {
        login,
        logout,
        isLogged: Boolean(data && data.username),
        loading: authState.loading,
        error: authState.error,
        data
    }
}
