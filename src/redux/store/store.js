import { createStore, combineReducers, compose, applyMiddleware } from "redux";

// Reducers
import userReducer from "../reducers/user.js";
import oddsmatcherReducer from "../reducers/oddsmatcher.js";
import dutcherReducer from "../reducers/dutcher.js";
import trimatcherReducer from "../reducers/trimatcher.js";

// Redux Thunk
import thunk from "redux-thunk";

const initialState = {
  // User Informations
  user: {
    isUserLogged: false,
  },
  // Oddsmatcher informations
  oddsmatcher: {
    odds: [],
    temporaryOdds: [],
    firstBookmaker: null,
    showOddsmatcherMatchInfoModal: false,
    matchInfo: {},
  },
  // Dutcher Informations
  dutcher: {
    odds: [],
    temporaryOdds: [],
    firstBookmaker: null,
    showDutcherMatchInfoModal: false,
    matchInfo: {},
  },
  // Trimatcher informations
  trimatcher: {
    odds: [],
    temporaryOdds: [],
    firstBookmaker: null,
    showTrimatcherMatchInfoModal: false,
    matchInfo: {},
  },
};

const mainReducer = combineReducers({
  user: userReducer,
  oddsmatcher: oddsmatcherReducer,
  dutcher: dutcherReducer,
  trimatcher: trimatcherReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(
    mainReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
