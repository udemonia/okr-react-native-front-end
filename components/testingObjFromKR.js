const data = require('../_data/keyResults.json');

const ObjectiveFromKeyResults = data.map((KRs) => {
    return {
        atRisk: KRs.objective.atRisk,
        percentComplete: KRs.objective.percentComplete,
        _id: KRs.objective._id,
        name: KRs.objective.name,
        description: KRs.objective.description,
        objectiveStartDate: KRs.objective.objectiveStartDate,
        objectiveEndDate: KRs.objective.objectiveEndDate
    }
})

console.log(ObjectiveFromKeyResults)