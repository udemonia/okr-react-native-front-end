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

  const gettingStartedExample = () => {

    return (
        <View>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "April", "May", "June", "Brandon"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          width={screenWidth * .9 } // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
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
              strokeWidth: "2",
              stroke: colors.pink
            }
          }}
          bezier
          style={{
            borderRadius: 10,
          }}
        />
      </View>
    )

  }

  export default gettingStartedExample;