import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import colors from '../../colors/lightMode'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Swim", "Bike", "Run"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const gettingStartedPie = () => {

    return (
        <View style={{paddingHorizontal: 10, marginHorizontal: 10}}>

        <ProgressChart
            data={data}
            width={screenWidth}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: colors.pink,
              backgroundGradientFrom: colors.mediumPurple,
              backgroundGradientTo: colors.darkPurple,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {

              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: colors.pink
              }
            }}
            hideLegend={false}
        />          

        </View>
    )

  }

  export default gettingStartedPie;