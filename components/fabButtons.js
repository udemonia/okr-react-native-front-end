import * as React from 'react';
import { FAB, Portal, Provider, Colors } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons' 
import colors from '../colors/lightMode'
import dayjs from 'dayjs';



// const data = require('../_data/objectives.json');
const today = dayjs().format()




const fabButtons = (props) => {

  const { data } = props

  const whatToShow = (openClosedFilter) => {
    if (openClosedFilter === '') {
        return data

    } else if (openClosedFilter === 'openFilter') {
        return data.filter((objective) => objective.objectiveEndDate >= today )

    } else if (openClosedFilter === 'closeFilter') {
        return data.filter((objective) => objective.objectiveEndDate < today )
    }
}

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const [ fabOpacity, setFabOpacity ] = React.useState(0.9)
  const { open } = state;


  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
        //   style={{colors: colors.mediumPurple }}
          icon={open ? 'close' : 'filter-variant-plus'}
          fabStyle={{ backgroundColor: colors.lightGrey, opacity: fabOpacity}}
          actions={[
            {
              icon: 'filter-variant-remove',
              label: 'clear',
              onPress: () => console.log(whatToShow('', data)),
              small:true
            },
            {
              icon: 'progress-close',
              label: 'done',
              onPress: () => console.log(whatToShow('closeFilter', data)),
              small:false
            },
            {
              icon: 'progress-clock',
              label: 'open',
              onPress: () => console.log('openFilter', data),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};


const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
})

export default fabButtons;