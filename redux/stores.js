 import { legacy_createStore as createStore } from "redux";
// import {createStore as createStore} from "redux";
import { reducer } from "./reducers";

export const store = createStore(
   reducer,
);
