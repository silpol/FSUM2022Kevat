import { useReducer } from 'react';
import AppStateContext from './AppStateContext';
import ActionContext from './ActionContext';
import * as ActionConstants from '..types/actionConstants';

const getInitialState = () => {
    if(sessionStorage.getItem("state")) {
        let state = JSON.parse(sessionStorage.getItem("state"));
        return state;
    } else {
        return {
            list:[],
            token:"",
            isLogged:false,
            loading:false,
            error:""
        }
    }

}

const initialState = getInitialState();

const saveToStorage = (state) => {

    sessionStorage.setItem("state", JSON.stringify(state));
}

const listReducer = (state, action) => {
    // TODO fill the reducer
}

const stateProvider = (props) => {
    const [state, dispatch] = useReducer(listReducer, initialState);

    return (
        <AppStateContext.Provider value={state}>
           <ActionContext.Provider value={{dispatch:dispatch}}>
                {props.children}
            </ActionContext.Provider> 
        </AppStateContext.Provider>
    )
}

export default StateProvider;