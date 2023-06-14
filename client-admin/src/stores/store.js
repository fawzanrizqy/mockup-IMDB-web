import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import mainReducer from "../reducers/mainReducer";
import movieReducer from "../reducers/movieReducer";
import genreReducer from "../reducers/genreReducer";
import userReducer from "../reducers/userReducer";


const rootReducer = combineReducers({
    main: mainReducer,
    movie: movieReducer,
    genre: genreReducer,
    user: userReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;