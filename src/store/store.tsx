import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import countryReducer from "../reducer/countryReducer";
import stateReducer from "../reducer/stateReducer";
import cityReducer from "../reducer/cityReducer";

const rootReducer = combineReducers({
  country: countryReducer,
  state: stateReducer,
  city: cityReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export default store;
