import axios from "axios"

export default function getProfile(id){
    return axios({
        method: "GET",
        url: `http://localhost:8080/users/profile?id=${id}`
    }).then(res => {
        const values = {
            user: res.data.user,
            posts: res.data.posts
        }
        return values
    }).catch(err => {
        throw new Error(err.response.data)
    })
}