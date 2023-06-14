import { CLEAR_GENRE, FETCH_GENRE_FAIL, FETCH_GENRE_PENDING, FETCH_GENRE_SUCCESS, WRITE_GENRE_FAIL, WRITE_GENRE_PENDING, WRITE_GENRE_SUCCESS } from "../actions/type"

const initialState = {
    dataGenre: [],
    selectedGenre: undefined,
    isLoading: false,
    errMessage: undefined
}

const genreReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_GENRE:
            return {
                ...state,
                selectedGenre: undefined
            }
        case FETCH_GENRE_SUCCESS:
            if (!action.payload.length) {
                return {
                    ...state,
                    selectedGenre: action.payload,
                    isLoading: false,
                }
            }
            else {
                return {
                    ...state,
                    dataGenre: action.payload,
                    isLoading: false,
                }
            }
        case FETCH_GENRE_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false,
            }
        case FETCH_GENRE_PENDING:
            return {
                ...state,
                isLoading: true,
            }
        case WRITE_GENRE_SUCCESS:
            return {
                ...state,
                dataGenre: state.dataGenre,
                errMessage: "",
                isLoading: false,
            }
        case WRITE_GENRE_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false,
            }
        case WRITE_GENRE_PENDING:
            return {
                ...state,
                isLoading: true,
            }

        default:
            return state;
    }
}

export default genreReducer