import User from "../entities/user";

function userMapper(user){
    const { id, username, password } = user
    return new User({id, username, password})
}

export default userMapper