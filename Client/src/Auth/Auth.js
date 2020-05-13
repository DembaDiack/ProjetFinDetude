import Cookies from "universal-cookie";
import crypto from 'crypto-js';
import Axios from "axios";

class Auth{
    constructor(){
        this.pass = "iscae";
        this.cookies = new Cookies();
        this.email = this.cookies.get("email");
        this.connected = false;
        this.checkConnection();
        return this;
    }
    checkConnection(callback){
        if(this.email !== undefined){
            this.email = crypto.AES.decrypt(this.email,this.pass).toString(crypto.enc.Utf8);
            this.connected = true;
        }
        else{
            this.connected = false;
        }
    }
    connect(email){
        this.email = crypto.AES.encrypt(email,this.pass).toString();
        this.cookies.set("email",this.email);
        return this;
    }
    disconnect(){
        this.cookies.remove("email");
        return this;
    }
    getEmail(){
        return this.email;
    }
    isConnected()
    {
        return this.connected;
    }
    getUserInfo()
    {
        return Axios.get(`http://localhost:2000/user/${this.email}`)
        .then(result => {
            return result.data;
        })
        .catch(err => {
            return undefined;
        })
    }

    getUserDocs(email)
    {
        return Axios.get(`/docs/${email}`).then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
    }
}


export default Auth;