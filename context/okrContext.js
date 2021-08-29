import React from 'react';
import OKRs from '../_data/objectives.json'

const OKRsContext = React.createContext(); // a pipe which handles data flow between components - global state - avoid prop drilling!

//* children -> 
//* accepts another component as a child.....

export const OKRsProvider = ({ children }) => {

    const ObjectiveAndKeyResults = OKRs
    return <OKRsContext.Provider value={ObjectiveAndKeyResults}>
        {children}
    </OKRsContext.Provider>
}

export default OKRsContext;