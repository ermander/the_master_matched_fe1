import { createStore } from "redux"
import { mainReducer } from "../reducer/reducer"

const initialState = {
    isUserLogged: false
}

export default function configureStore() {
    return createStore(mainReducer, initialState, 
        // Just for the redux tool extantion
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
}