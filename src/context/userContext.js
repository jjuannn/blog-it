import React, {useEffect, useReducer} from "react"

export const userContext = React.createContext({})

export default function UserContextProvider({children}){
    const [ userValues, userDispatch] = useReducer(userReducer, initialValue)

    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    useEffect(() => {
        if(sessionUser){
            userDispatch({
                type: USER_ACTIONS.LOGIN_OR_REGISTER, 
                payload: sessionUser
            })
        }
    }, [userDispatch])

    return(
        <userContext.Provider value={{ userValues, userDispatch }}>
            {children}
        </userContext.Provider>
    )
}

const initialValue = { data: null }

const USER_ACTIONS = {
    LOGIN_OR_REGISTER: "LOGIN_OR_REGISTER",
    LOGOUT: "LOGOUT"
}

function userReducer(state, action){
    const {type, payload} = action

    switch(type){
        case USER_ACTIONS.LOGIN_OR_REGISTER: 
            return {...state, data: payload}
        case USER_ACTIONS.LOGOUT:
            return {...state, data: null}
        default: 
            return state
    }
}