import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import dutcherReducer from "../reducers/dutcher.js";
import userReducer from "../reducers/user.js";
import thunk from "redux-thunk";

const initialState = {
  // USER INFORMATION STATE
  user: {
    isUserLogged: false,
  },
  // DUTCHER INFORMATIONS STATE
  dutcher: {
    odds: [],
    temporaryOdds: [],
  },
};

const mainReducer = combineReducers({
  user: userReducer,
  dutcher: dutcherReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  return createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
