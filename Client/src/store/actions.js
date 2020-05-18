const connect = ()=>
{
    return{
        type : "CONNECT"
    }
}


const disconnect = ()=>
{
    return {
        type : "DISCONNECT"
    }
}

const setUserInfo = (user)=>
{
    return {
        type : "UPDATE_USER",
        user : user
    }
}
const searchActive = (value) => {
    return {
        type : "UPDATE_SEARCH",
        active : value
    }
}
export 
{
    connect,
    disconnect,
    searchActive
}