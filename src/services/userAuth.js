import axios from "axios"

export default function userAuth(action, data){
    return axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: `http://localhost:8080/users/${action}`,
        data: data
    }).then(res => { 
        return res.data
    }).catch(err => {
        throw new Error("Failed", err)
    })
}