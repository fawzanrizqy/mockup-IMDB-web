import {

    FETCH_MOVIE_FAIL, FETCH_MOVIE_PENDING, FETCH_MOVIE_SUCCESS, CLEAR_MOVIES,
} from "./type";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";


/////////////// MOVIE ACTION /////////////////////////

export const clearMovies = () => ({
    type: CLEAR_MOVIES,
});

export const moviesPending = () => ({
    type: FETCH_MOVIE_PENDING,
});

export const moviesSuccess = (responseJson) => ({
    type: FETCH_MOVIE_SUCCESS,
    payload: responseJson,
});

export const moviesError = (errorMessage) => ({
    type: FETCH_MOVIE_FAIL,
    payload: errorMessage,
});


export const fetchMovies = (url) => async (dispatch, getState) => {
    dispatch(moviesPending());
    try {
        // console.log(url)
        const response = await fetch(url, {
            method: "GET",
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        });
        const responseJson = await response.json();

        dispatch(moviesSuccess(responseJson));
    } catch (err) {

        dispatch(moviesError(err));
    }
};

