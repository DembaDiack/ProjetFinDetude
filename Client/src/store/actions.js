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
export 
{
    connect,
    disconnect
}