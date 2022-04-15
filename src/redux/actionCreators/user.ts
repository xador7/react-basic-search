import {Dispatch} from "react";
import {UserAction, UserActionType} from "../actionTypes/userActionType";
import {collection, deleteDoc, doc, onSnapshot, query, getDocs} from "@firebase/firestore";
import {db} from "../../firebase";

export const fetchUsers = () => {
    return async ( dispatch: Dispatch<UserAction> ) => {
            try{
                dispatch( {type: UserActionType.FETCH_USERS});

                let users: any = [];
                const querySnapshot = await getDocs(collection(db, "users"));
                querySnapshot.forEach((doc) => {
                    users.push( {...doc.data(), id: doc.id} );
                });

                dispatch({ type: UserActionType.FETCH_USERS_SUCCESS, payload: users });
                console.log( 'action get users', users );

            } catch (e) {
                dispatch( { type: UserActionType.FETCH_USERS_ERROR, payload: 'Error:' + e })
            }
    }
};

export const deleteUsers = (id: string) => {
    return async ( dispatch: Dispatch<UserAction> ) => {
        const taskDocRef = doc(db, 'users', id);
        try{
            dispatch( {type: UserActionType.DELETE_USERS});
            await deleteDoc(taskDocRef);

            let users: any = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                users.push( {...doc.data(), id: doc.id} );
            });

            dispatch( { type: UserActionType.DELETE_USERS_SUCCESS, payload: users });
        } catch (err) {
            dispatch( { type: UserActionType.DELETE_USERS_ERROR, payload: `Error - ${err}` })
        }
    }
};
