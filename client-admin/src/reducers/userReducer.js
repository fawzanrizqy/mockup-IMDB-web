import { CLEAR_USER, WRITE_USER_FAIL, WRITE_USER_PENDING, WRITE_USER_SUCCESS } from "../actions/type"

const initialState = {
    userId: null,
    access_token: null,
    isLoading: false,
    errMessage: ""
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {

        case WRITE_USER_SUCCESS:
            if (!action.payload.id) { //register new user
                return {
                    ...state,
                    isLoading: false,
                    errMessage: "",
                }
            }
            else { //login user
                return {
                    ...state,
                    userId: action.payload.id,
                    access_token: action.payload.access_token,
                    errMessage: "",
                    isLoading: false,
                }
            }
        case WRITE_USER_FAIL:
            return {
                ...state,
                errMessage: action.payload,
                isLoading: false,
            }
        case WRITE_USER_PENDING:
            return {
                ...state,
                isLoading: true,
            }

        case CLEAR_USER:
            return {
                ...state,
                access_token: null,
                userId: null,
                isLoading: false,
                errMessage: ""
            }

        default:
            return state;
    }
}

export default userReducer