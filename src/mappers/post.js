import Post from "../entities/post"

export default function postMapper(post){
    const { 
        id, 
        text, 
        title,
        picture, 
        author_id, 
        author_username, 
        author_picture 
    } = post
    return new Post({id, text, title, picture, author_id, author_username, author_picture})
}
