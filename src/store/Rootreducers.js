import { combineReducers } from "redux";
import booksReducer from "./book/booksReducer";


const RootReducers = combineReducers({
    booksReducer,
});

export default RootReducers;
