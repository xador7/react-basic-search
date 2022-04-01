// import { configureStore } from '@reduxjs/toolkit'
//
// const store = configureStore({
//     reducer: {
//
//     },
// });
//
// export default store;
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import { applyMiddleware, createStore } from 'redux'
import thunk from "redux-thunk";
import { rootReducer } from "./reducers";

export const store = createStore(rootReducer, applyMiddleware(thunk));


