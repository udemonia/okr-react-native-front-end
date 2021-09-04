import React, { useReducer } from 'react';
import { State } from 'react-native-gesture-handler';
import OKRs from '../_data/objectives.json'

const OKRsContext = React.createContext(); 
// a pipe which handles data flow between components - global state - avoid prop drilling!

const OKRsReducer = (state, action) => {
    switch ( action.type ) {
        case 'addObjective':
            return [...state, 
        {
                "atRisk": true,
                "percentComplete": 99,
                "_id": "6117e320fd7d720fa058935f",
                "name": `${state.length} TEST OBJECTIVE ON USE State`,
                "description": "This is only a test",
                "objectiveStartDate": "2021-07-01T00:00:00.000Z",
                "objectiveEndDate": "2021-12-31T00:00:00.000Z",
                "user": "60e2f4d5a85e1c5ba5fc999e",
                "slug": "take-a-family-vacation",
                "__v": 0
            }]
        default:
            return state
    }

};


export const OKRsProvider = ({ children }) => {

    const [ objectivesArray, dispatch ] = useReducer(OKRsReducer, OKRs)

    const addObjective = () => {
        dispatch({ type: addObjective })
    }

    console.log('\nThis is the Start of the new Array\n')
    console.log(objectivesArray)

    return <OKRsContext.Provider value={{ objectivesArray, addObjective }}>
        {children}
    </OKRsContext.Provider>
}

export default OKRsContext;