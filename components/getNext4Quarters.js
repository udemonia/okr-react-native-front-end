// import dayjs from 'dayjs'
const dayjs = require('dayjs');
const quarterOfYear = require('dayjs/plugin/quarterOfYear');
const { getConsoleOutput } = require('jest-util');
dayjs.extend(quarterOfYear)


let today = dayjs().format();
let year = dayjs().year();
let currentQuarter = dayjs(today).quarter();
currentQuarter = 4
let quarterTitle = `Q${currentQuarter} ${year}`
let nextQuarter;

const returnNext4QuarterDates = () => {

    let today = dayjs().format();
    let year = dayjs().year();
    let currentQuarter = dayjs(today).quarter();
    let quarterTitle = `Q${currentQuarter} ${year}`
    let nextQuarter;

    if (currentQuarter < 4) {
        nextQuarter = currentQuarter + 1
        console.log(`Next Quarter = ${nextQuarter}`)
    } 

    if (currentQuarter === 4) {
        nextQuarter = 1
        year = year + 1
        console.log(`Next Quarter = ${nextQuarter}`)
        console.log(year)
    }


}

// returnNext4QuarterDates()


const StartOfCurrentQuarter = dayjs().startOf('quarter')
const EndOfCurrentQuarter = dayjs().endOf('quarter')

console.log('the start of the quarter is ', StartOfCurrentQuarter)

//! Get the start dates of the next 5 quarters from today
const firstNextQuarter = dayjs(StartOfCurrentQuarter).add(1, 'quarter')
const secondNextQuarter = dayjs(StartOfCurrentQuarter).add(2, 'quarter')
const thirdNextQuarter = dayjs(StartOfCurrentQuarter).add(3, 'quarter')
const fourthNextQuarter = dayjs(StartOfCurrentQuarter).add(4, 'quarter')
const fifthNextQuarter = dayjs(StartOfCurrentQuarter).add(5, 'quarter')

const firstNextQuarterEnd = dayjs(secondNextQuarter).subtract(1, 'day')
const secondNextQuarterEnd = dayjs(thirdNextQuarter).subtract(1, 'day')
const thirdNextQuarterEnd = dayjs(fourthNextQuarter).subtract(1, 'day')
const fourthNextQuarterEnd = dayjs(fifthNextQuarter).subtract(1, 'day')

const titleFirstNextQuarter = `Q${dayjs(firstNextQuarter).quarter()} - ${dayjs(firstNextQuarter).year()}`
const titleSecondNextQuarter = `Q${dayjs(secondNextQuarter).quarter()} - ${dayjs(secondNextQuarter).year()}`
const titleThirdNextQuarter = `Q${dayjs(thirdNextQuarter).quarter()} - ${dayjs(thirdNextQuarter).year()}`
const titleFourthNextQuarter = `Q${dayjs(fourthNextQuarter).quarter()} - ${dayjs(fourthNextQuarter).year()}`



console.log('\nNext Quarter:')
console.log('selection title = ', titleFirstNextQuarter)
console.log(firstNextQuarter.format('MM/DD/YYYY'))
console.log(firstNextQuarterEnd.format('MM/DD/YYYY'))

console.log('\nTwo Quarter:')
console.log('selection title = ', titleSecondNextQuarter)
console.log(secondNextQuarter.format('MM/DD/YYYY'))
console.log(secondNextQuarterEnd.format('MM/DD/YYYY'))



console.log('\nThree Quarter:')
console.log('selection title = ', titleThirdNextQuarter)
console.log(thirdNextQuarter.format('MM/DD/YYYY'))
console.log(thirdNextQuarterEnd.format('MM/DD/YYYY'))

console.log('\nFour Quarter:')
console.log('selection title = ', titleFourthNextQuarter)
console.log(fourthNextQuarter.format('MM/DD/YYYY'))
console.log(fourthNextQuarterEnd.format('MM/DD/YYYY'))

// currentQuarter = dayjs(today).quarter()



//* 1 get today

//* find the start of the next quarter

//* 