import {useCallback, useContext, useReducer} from "react"
import {userContext} from "../context/userContext"
import userAuth from "../services/userAuth"

const ACTIONS = {
    LOADING: "LOADING",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
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
    const { user, setUser } = useContext(userContext)
    const [ authState, dispatch] = useReducer(authReducer, initialValues)

    const login = (action, data) => {
        dispatch({type: ACTIONS.LOADING})
        userAuth(action, data)
        .then((res) => {
            dispatch({type: ACTIONS.SUCCESS })
            setUser(res)
            window.sessionStorage.setItem("user", JSON.stringify(res))
        }).catch(err => {
            dispatch({type: ACTIONS.ERROR, payload: err})
        })
    }

    const logout = useCallback(() => {
        window.sessionStorage.removeItem("user")
        setUser(null)
    }, [setUser])
    
    return {
        login,
        logout,
        isLogged: Boolean(user && user.username),
        loading: authState.loading,
        error: authState.error,
        user
    }
}
