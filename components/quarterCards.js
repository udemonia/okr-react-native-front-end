
import React, { useState } from 'react'
import { View, Text, LayoutAnimation } from 'react-native'
import { List } from 'react-native-paper'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarterOfYear)
const StartOfCurrentQuarter = dayjs().startOf('quarter')

const firstNextQuarter = dayjs(StartOfCurrentQuarter).add(1, 'quarter').format('MM/DD/YYYY')
const secondNextQuarter = dayjs(StartOfCurrentQuarter).add(2, 'quarter').format('MM/DD/YYYY')
const thirdNextQuarter = dayjs(StartOfCurrentQuarter).add(3, 'quarter').format('MM/DD/YYYY')
const fourthNextQuarter = dayjs(StartOfCurrentQuarter).add(4, 'quarter').format('MM/DD/YYYY')
const fifthNextQuarter = dayjs(StartOfCurrentQuarter).add(5, 'quarter').format('MM/DD/YYYY')

const firstNextQuarterEnd = dayjs(secondNextQuarter).subtract(1, 'day').format('MM/DD/YYYY')
const secondNextQuarterEnd = dayjs(thirdNextQuarter).subtract(1, 'day').format('MM/DD/YYYY')
const thirdNextQuarterEnd = dayjs(fourthNextQuarter).subtract(1, 'day').format('MM/DD/YYYY')
const fourthNextQuarterEnd = dayjs(fifthNextQuarter).subtract(1, 'day').format('MM/DD/YYYY')

const titleFirstNextQuarter = `Q${dayjs(firstNextQuarter).quarter()} - ${dayjs(firstNextQuarter).year()}  |  ${firstNextQuarter} - ${firstNextQuarterEnd}`
const titleSecondNextQuarter = `Q${dayjs(secondNextQuarter).quarter()} - ${dayjs(secondNextQuarter).year()}  |  ${secondNextQuarter} - ${secondNextQuarterEnd}`
const titleThirdNextQuarter = `Q${dayjs(thirdNextQuarter).quarter()} - ${dayjs(thirdNextQuarter).year()}  |  ${thirdNextQuarter} - ${thirdNextQuarterEnd}`
const titleFourthNextQuarter = `Q${dayjs(fourthNextQuarter).quarter()} - ${dayjs(fourthNextQuarter).year()}  |  ${fourthNextQuarter} - ${fourthNextQuarterEnd}`



const QuarterCards = ({ addStartDate, addEndDate }) => {
    console.log(addStartDate)
    const [ quarterSelected, setQuarterSelected ] = useState(null)
    const [ expanded, setExpanded ] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const quarterSelectionHandler = (title) => {
        setExpanded(!expanded)
        console.log(expanded)
        setQuarterSelected(title)
        console.log(`Quarter Selected: ${quarterSelected}`)
    }
  
    return (
      <List.Section>
        <List.Accordion
        //   theme={{ colors: { primary: '#4169e1' } }}
          style={{ backgroundColor: 'white', marginBottom: 1 }}
          onPress={() => { LayoutAnimation.easeInEaseOut(); }}
          title="Plan by Quarter">
          <List.Item title={titleFirstNextQuarter} onPress={ () => {
              addStartDate(firstNextQuarter) 
              addEndDate(firstNextQuarterEnd)}}/>
          <List.Item title={titleSecondNextQuarter} onPress={ () => {
              addStartDate(secondNextQuarter) 
              addEndDate(secondNextQuarterEnd)}}/>
          <List.Item title={titleThirdNextQuarter} onPress={ () => {
              addStartDate(thirdNextQuarter) 
              addEndDate(thirdNextQuarterEnd)}}/>
          <List.Item title={titleFourthNextQuarter} onPress={ () => {
              addStartDate(fourthNextQuarter) 
              addEndDate(fourthNextQuarterEnd)}} />
        </List.Accordion>
      </List.Section>
    );
}

export default QuarterCards;