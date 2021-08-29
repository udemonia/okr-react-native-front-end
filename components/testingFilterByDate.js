

const data = require('../_data/objectives.json');
const dayjs = require('dayjs');
let today = dayjs().format()

const whatToShow = (openClosedFilter) => {
    console.log(openClosedFilter === '')
    if (openClosedFilter === '') {
        return data

    } else if (openClosedFilter === 'openFilter') {
        return data.filter((objective) => objective.objectiveEndDate >= today )

    } else if (openClosedFilter === 'closeFilter') {
        return data.filter((objective) => objective.objectiveEndDate < today )
    }
}

// console.log(whatToShow('openFilter'))

// console.log(whatToShow(''))

console.log('\nObjective Ended: \n')
console.log(whatToShow('closeFilter'))
console.log(today)