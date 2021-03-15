import axios from "axios"
import postMapper from "../mappers/post"

export default function getPosts(){
    return axios({
        method: "get",
        url: "http://localhost:8080/posts/all"
    }).then(res => {
        const data = res.data
        const posts = data.map( post => postMapper(post))
        return posts
    }).catch(err => {
        console.log(err.response)
        // falta fixear esto
    })
}