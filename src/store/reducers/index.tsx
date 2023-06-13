import { combineReducers } from "redux";
import clients from "../slices/clientsSlice";

const reducers = combineReducers({
    clients
});

export default reducers;