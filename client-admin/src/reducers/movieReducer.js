import { CLEAR_MOVIES, FETCH_MOVIE_FAIL, FETCH_MOVIE_PENDING, FETCH_MOVIE_SUCCESS, WRITE_MOVIE_FAIL, WRITE_MOVIE_PENDING, WRITE_MOVIE_SUCCESS } from "../actions/type"

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

        case WRITE_MOVIE_SUCCESS:
            // console.log("MASUK SUKSES")
            return {
                ...state,
                errMessage: "",
                isLoading: false,
            }
        case WRITE_MOVIE_FAIL:
            // console.log("MASUK GAGAL")
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false,
            }
        case WRITE_MOVIE_PENDING:
            return {
                ...state,
                isLoading: true,
            }


        default:
            return state;
    }
}

export default movieReducer