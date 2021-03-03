import {useCallback, useContext, useState} from "react"
import {userContext} from "../context/userContext"
import userAuth from "../services/userAuth"

export default function useUser(){
    const { user, setUser } = useContext(userContext)
    const [ authState, setState ] = useState({loading: false, error: null})

    const login = useCallback((action, data) => {
        setState({loading: true, error: null})
        userAuth(action, data).then((res) => {
            setState({loading: false, error: null})
            setUser(res)
            window.sessionStorage.setItem("user", JSON.stringify(res))
        }).catch(err => {
            console.log("failed")
            setState({loading: false, error: err})
        })
    }, [setUser])

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
