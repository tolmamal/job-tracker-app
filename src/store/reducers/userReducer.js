import { SAVE_USER_COMPANIES, SAVE_USER_APPLICATIONS } from "../actions";


const initialState = {
    uid: null,
    companies: [],
    applications: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_COMPANIES:
            return {
                ...state,
                uid: action.payload.uid,
                companies: action.payload.companies
            };
        case SAVE_USER_APPLICATIONS:
            return {
                ...state,
                uid: action.payload.uid,
                applications: action.payload.applications
            };
        default:
            return state;
    }
};

export default userReducer;
