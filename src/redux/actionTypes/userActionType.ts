export interface UserState {
    users: any[],
    loading: boolean,
    error: null | string
}

export enum UserActionType {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
    DELETE_USERS = 'DELETE_USERS',
    DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS',
    DELETE_USERS_ERROR = 'DELETE_USERS_ERROR',
    SEARCH_USERS = 'SEARCH_USERS'
}

interface FetchUserAction {
    type: UserActionType.FETCH_USERS
}
interface FetchUserSuccessAction {
    type: UserActionType.FETCH_USERS_SUCCESS;
    payload: any[];
}
interface FetchUserErrorAction {
    type: UserActionType.FETCH_USERS_ERROR;
    payload: string;
}

interface DeleteUserAction {
    type: UserActionType.DELETE_USERS
}
interface DeleteUserSuccessAction {
    type: UserActionType.DELETE_USERS_SUCCESS;
    payload: any[];
}
interface DeleteUserErrorAction {
    type: UserActionType.DELETE_USERS_ERROR;
    payload: string;
}

interface SearchUserAction {
    type: UserActionType.SEARCH_USERS
    payload: any[];
}
// interface SearchUserSuccessAction {
//     type: UserActionType.SEARCH_USERS_SUCCESS;
//     payload: string;
// }

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction | DeleteUserAction |
    DeleteUserSuccessAction | DeleteUserErrorAction | SearchUserAction;
