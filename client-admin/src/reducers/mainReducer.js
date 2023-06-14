import { SET_MODAL_TITLE, TOGGLE_MODAL } from "../actions/type";

const initialState = {
    statusModal: false,
    titleModal: ""
}


const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODAL:
            return {
                ...state,
                statusModal: !state.statusModal
            }
        case SET_MODAL_TITLE:
            return {
                ...state,
                titleModal: action.payload
            }

        default:
            return state;
    }
}

export default mainReducer