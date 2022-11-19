import allReducers from "../reducers/root.js";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createTransform } from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import promiseMiddleware from 'redux-promise';
import { stringify, parse } from 'flatted';
import AsyncStorage from '@react-native-async-storage/async-storage';

const transformCircular = createTransform(
    (inboundState, key) => stringify(inboundState),
    (outboundState, key) => parse(outboundState),
)

const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    transforms: [transformCircular]
};

const pReducer = persistReducer(persistConfig, allReducers);

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(pReducer, composeEnhancers(applyMiddleware(reduxThunk, promiseMiddleware)));

export const persistor = persistStore(store);

store.subscribe(() => {
    console.log("Store is now: ", store.getState());
})