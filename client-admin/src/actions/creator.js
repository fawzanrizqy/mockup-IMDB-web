import {
    FETCH_GENRE_FAIL, FETCH_GENRE_PENDING, FETCH_GENRE_SUCCESS, WRITE_GENRE_FAIL, WRITE_GENRE_PENDING, WRITE_GENRE_SUCCESS,
    FETCH_MOVIE_FAIL, FETCH_MOVIE_PENDING, FETCH_MOVIE_SUCCESS, SET_MODAL_TITLE, TOGGLE_MODAL, WRITE_MOVIE_FAIL, WRITE_MOVIE_PENDING, WRITE_MOVIE_SUCCESS, CLEAR_MOVIES, WRITE_USER_PENDING, WRITE_USER_SUCCESS, WRITE_USER_FAIL, CLEAR_GENRE, CLEAR_USER
} from "./type";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://movies-ch1-api.ojan.dev";


////////////////    MODAL ACTION ///////////////////////

export const toggleModal = () => ({
    type: TOGGLE_MODAL
})

export const setModalTitle = (title) => ({
    type: SET_MODAL_TITLE,
    payload: title
})


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
        console.log(url)
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

////////////////// POST / PUT / DELETE MOVIE//////////////////////////

export const writeMovies = (url, data, method) => async (dispatch, getState) => {
    dispatch(wmoviesPending());
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                access_token: localStorage.getItem("access_token")
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log(responseJson)
        if (responseJson.message) //handle error message
        {
            dispatch(wmoviesError(responseJson.message));
        }
        else //handle success 
        {
            dispatch(wmoviesSuccess(responseJson));
            dispatch(fetchMovies(baseUrl + "/movies"));
        }
    } catch (err) {

        dispatch(wmoviesError(err));
    }
};


export const wmoviesPending = () => ({
    type: WRITE_MOVIE_PENDING,
});

export const wmoviesSuccess = (responseJson) => ({
    type: WRITE_MOVIE_SUCCESS,
    payload: responseJson,
});

export const wmoviesError = (errorMessage) => ({
    type: WRITE_MOVIE_FAIL,
    payload: errorMessage,
});


///////////////////// GENRE ACTION ////////////////////////////////

export const clearGenre = () => ({
    type: CLEAR_GENRE,
});

export const genresPending = () => ({
    type: FETCH_GENRE_PENDING,
});

export const genresSuccess = (responseJson) => ({
    type: FETCH_GENRE_SUCCESS,
    payload: responseJson,
});

export const genresError = (errorMessage) => ({
    type: FETCH_GENRE_FAIL,
    payload: errorMessage,
});


export const fetchGenres = (url) => async (dispatch, getState) => {
    dispatch(genresPending());
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                access_token: localStorage.getItem("access_token")
            }
        });
        const responseJson = await response.json();

        dispatch(genresSuccess(responseJson));
    } catch (err) {

        dispatch(genresError(err));
    }
};

////////////////// POST / DELETE GENRE//////////////////////////

export const writeGenres = (url, data, method) => async (dispatch, getState) => {
    dispatch(wgenresPending());
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                access_token: localStorage.getItem("access_token")
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log(responseJson)
        if (responseJson.message) //handle error message
        {
            dispatch(wgenresError(responseJson.message));
        }
        else //handle success 
        {
            dispatch(wgenresSuccess(responseJson));
        }
    } catch (err) {

        dispatch(wgenresError(err));
    }
};


export const wgenresPending = () => ({
    type: WRITE_GENRE_PENDING,
});

export const wgenresSuccess = (responseJson) => ({
    type: WRITE_GENRE_SUCCESS,
    payload: responseJson,
});

export const wgenresError = (errorMessage) => ({
    type: WRITE_GENRE_FAIL,
    payload: errorMessage,
});
////////////////// POST  USER//////////////////////////

export const writeUsers = (url, data, method) => async (dispatch, getState) => {
    dispatch(wusersPending());
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log(responseJson)
        if (responseJson.message) //handle error message
        {
            dispatch(wusersError(responseJson.message));
        }
        else //handle success 
        {
            dispatch(wusersSuccess(responseJson));
        }

    } catch (err) {

        dispatch(wusersError(err));
    }
};


export const clearUser = () => ({
    type: CLEAR_USER,
});

export const wusersPending = () => ({
    type: WRITE_USER_PENDING,
});

export const wusersSuccess = (responseJson) => ({
    type: WRITE_USER_SUCCESS,
    payload: responseJson,
});

export const wusersError = (errorMessage) => ({
    type: WRITE_USER_FAIL,
    payload: errorMessage,
});

