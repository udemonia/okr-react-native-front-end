import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../../colors/lightMode'
import {
    ProgressChart,
  } from "react-native-chart-kit";


const totalCountOfStatus = { completed: 0, planned: 3, inProgress: 9 }

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Planned", "In-Progress", "Completed", ], // optional
    data: [1, 0.6, 0.8]
  };

  const CountOfStatus = () => {

    return (
        <View style={{paddingHorizontal: 10, marginHorizontal: 10}}>

        <ProgressChart
            data={data}
            width={screenWidth}
            height={220}
            strokeWidth={10}
            radius={32}
            color={colors.darkPurple}
            chartConfig={{
              backgroundColor: colors.pink,
              backgroundGradientFrom: colors.pink,
              backgroundGradientTo: colors.purpleObjectiveTile,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                marginVertical: 8,
                borderRadius: 20
              },
              propsForDots: {
                r: "6",
                strokeWidth: "1",
                stroke: colors.pink
              }
            }}
            hideLegend={false}
        />          

        </View>
    )

  }

  export default CountOfStatus;