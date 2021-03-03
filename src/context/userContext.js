import React, {useEffect, useState} from "react"

export const userContext = React.createContext({})

export default function UserContextProvider({children}){
    const [user, setUser ] = useState(null) 
    const sessionUser = JSON.parse(sessionStorage.getItem("user"))
    useEffect(() => {
        if(sessionUser){
            setUser(sessionUser)
        }
    }, [setUser])

    return(
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    )
}
