import axios from "axios"
import user from "../mappers/user"

export default function userAuth(action, userCredentials){
    return axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: `http://localhost:8080/users/${action}`,
        data: userCredentials
    }).then(res => {
        const userValues = user(res.data)
        return userValues
    }).catch(err => {
        throw new Error(err.response.data)
    })
}