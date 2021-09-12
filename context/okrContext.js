import React, { useState } from 'react';
import OKRs from '../_data/objectives.json'
import objectivesAPI from '../api/objectivesAPI';

const OKRsContext = React.createContext(); 
// a pipe which handles data flow between components - global state - avoid prop drilling!


export const OKRsProvider = ({ children }) => {

    const [ objectivesArray, setObjectivesArray ] = useState()

    const getObjectives = async (JWTtoken) => {
                let auth = JWTtoken
                const response = await fetch('http://161.35.237.86:2002/api/v1/objectives', {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${auth}`
                    }
                })
                const results = await response.json()
                setObjectivesArray(results.data)
                console.log('GET REQUEST')
        
    }

    const getSingleObjectiveAndKeyResult = async (JWTtoken, objectiveId) => {
    
            const auth = JWTtoken
            const response = await fetch(`http://161.35.237.86:2002/api/v1/objectives/${objectiveId}/keyresults`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${auth}`
                }
            })
            const results = await response.json()
            setObjectivesArray(results.data)
    }

    const updateObjective = () => {
        
    }

    const deleteObjective = async(JWTtoken, objectiveId) => {
        let auth = JWTtoken
        console.log(`Auth: ${auth}`)
        const response = await fetch(`http://161.35.237.86:2002/api/v1/objectives/${objectiveId}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${auth}`
            }
        })
        console.log(`deleting ${objectiveId}`)
        console.log(response.status)
    }

    const addObjective = () => {
        setObjectivesArray([

            ...objectivesArray, 
            {
                "atRisk": true,
                "percentComplete": 99,
                "_id": "6117e320fd7d720fa058935f",
                "name": `${objectivesArray.length} TEST OBJECTIVE ON USE STATE`,
                "description": "This is only a test",
                "objectiveStartDate": "2021-07-01T00:00:00.000Z",
                "objectiveEndDate": "2021-12-31T00:00:00.000Z",
                "user": "60e2f4d5a85e1c5ba5fc999e",
                "slug": "take-a-family-vacation",
                "__v": 0
            }
        ])
    }

    return <OKRsContext.Provider value={{ objectivesArray, addObjective, getObjectives, deleteObjective }}>
        {children}
    </OKRsContext.Provider>
}

export default OKRsContext;