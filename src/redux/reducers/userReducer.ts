import {UserAction, UserActionType, UserState} from "../actionTypes/userActionType";

const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type){
        case UserActionType.FETCH_USERS:
            return { loading: true, error: null, users: [] };
        case UserActionType.FETCH_USERS_SUCCESS:
            return { loading: false, error: null, users: action.payload };
        case UserActionType.FETCH_USERS_ERROR:
            return { loading: false, error: action.payload, users: [] };
        case UserActionType.DELETE_USERS:
            return { loading: true, error: null, users: [] };
        case UserActionType.DELETE_USERS_SUCCESS:
            return { loading: false, error: null, users: action.payload };
            // return { loading: false, error: null, users: state.users.filter(item => item.id !== action.payload) };
        case UserActionType.DELETE_USERS_ERROR:
            return { loading: false, error: action.payload, users: [] };
        case UserActionType.SEARCH_USERS:
            return { loading: false, error: null, users: action.payload };
        default:
            return state
    }
};
