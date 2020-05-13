import reducer from "./reducer";
import {createStore} from "redux";


const store = createStore(reducer);
/*
had to use redux because navbar just wont listen to state changes, needed to go global
*/

export default store;