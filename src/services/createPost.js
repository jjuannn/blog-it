import axios from "axios"


export default function createPost(postData){
    return axios({
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        url: "http://localhost:8080/posts/create",
        data: postData
    }).then(res => {
        const serverResponse = res
        return serverResponse
    }).catch(err => {
        console.log("Falle")
        throw new Error(err.response.data)
    })
}