
//* Automate the Context creation w/ a helper function

import React, { Children, useReducer } from 'react';
import OKRs from '../_data/objectives.json'



export default (reducer, actions, initialState) => {

    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialState);

        return <Context.Provider value={state}>
            {children}
        </Context.Provider>

    }
    return { Context, Provider }
}

