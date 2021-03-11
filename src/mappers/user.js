import User from "../entities/user";

function userMapper(user){
    const { id, username, password, picture} = user
    return new User({id, username, password, picture})
}

export default userMapper