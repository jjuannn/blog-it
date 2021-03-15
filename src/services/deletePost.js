import axios from "axios"

export default function deletePost(id){
    return axios({
        method: "delete",
        url: `http://localhost:8080/posts/delete?id=${id}`
    }).then(res => {
        return true
    }).catch(err => {
        console.log(err.response)
        // return false - return err
        // falta fixear esto
    })
}