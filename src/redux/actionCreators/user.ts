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

                // const q = query(collection(db, "users"));
                // await onSnapshot( q, (querySnapshot) => {
                //     querySnapshot.forEach( (doc) => {
                //         users.push( {...doc.data(), id: doc.id} );
                //     } );
                //     dispatch({ type: UserActionType.FETCH_USERS_SUCCESS, payload: users });
                //     console.log( 'action get users', users );
                // } );
            } catch (e) {
                dispatch( { type: UserActionType.FETCH_USERS_ERROR, payload: 'Error' })
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

export const searchUsers = (users: any[] , searchQuery: string) => {
    console.log('searchUsers property users', users);
    console.log('searchUsers property searchQuery', searchQuery);
    return async ( dispatch: Dispatch<UserAction> ) => {
        let arr = [];
        try{
            for( const key in users ){
                let person = users[key].formData.firstName.toLowerCase() +" "+ users[key].formData.lastName.toLowerCase();
                console.log('person',person);
                if(person.slice(0, searchQuery.length).indexOf(searchQuery) !== -1){
                    arr.push({formData: users[key].formData, id: users[key]});
                }
            }
            console.log('aaaaarrrrrrr', arr);
            dispatch( {type: UserActionType.SEARCH_USERS, payload: arr});
            // setTimeout(() => {
            //
            //     }, 1500);

            // dispatch({ type: UserActionType.DELETE_USERS_SUCCESS, payload: id });
        } catch (err) {
            dispatch( { type: UserActionType.DELETE_USERS_ERROR, payload: `Error - ${err}` })
        }
    }
};
