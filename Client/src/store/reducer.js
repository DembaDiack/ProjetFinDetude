import Auth from "../Auth/Auth";
const auth = new Auth();

const initialState = {
    connected : auth.isConnected(),
    user : null
}


const reducer = (state = initialState ,action) => 
{
    if(action.type === "UPDATE_USER")
    {
        return{
            ...state,
            user : action.user
        }
    }
    if(action.type === "CONNECT")
    {
        return{
            ...state,
            connected : true
        }
    }

    if(action.type === "DISCONNECT")
    {
        return{
            ...state,
            connected : false
        }
    }
    if(action.type === "UPDATE_SEARCH")
    {
        return{
            ...state,
            active : action.active
        }
    }
    return state;
}

export default reducer;