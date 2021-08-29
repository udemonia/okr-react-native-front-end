const data = require('../_data/fullKeyResults.json');

const ObjectiveFromKeyResults = data.map((KRs) => {
    return {
        objective: KRs.objective
    }
})

console.log(ObjectiveFromKeyResults)