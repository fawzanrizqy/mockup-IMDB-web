import { CLEAR_MOVIES, FETCH_MOVIE_FAIL, FETCH_MOVIE_PENDING, FETCH_MOVIE_SUCCESS } from "../actions/type"

const initialState = {
    dataMovie: [],
    isLoading: false,
    errMessage: "",
    selectedMovie: undefined
}

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_MOVIES:
            return {
                ...state,
                selectedMovie: undefined,
                errMessage: "",
            }

        case FETCH_MOVIE_SUCCESS:
            if (!action.payload.length) {
                // console.log("masuk sini")
                return {
                    ...state,
                    selectedMovie: action.payload,
                    isLoading: false,
                }
            }
            else {
                return {
                    ...state,
                    dataMovie: action.payload,
                    isLoading: false,
                }
            }
            break;
        case FETCH_MOVIE_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false,
            }
        case FETCH_MOVIE_PENDING:
            return {
                ...state,
                isLoading: true,
            }



        default:
            return state;
    }
}

export default movieReducer