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
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43]
      }
    ]
  };

  const barChartExample = () => {

    return (
        <View style={{paddingHorizontal: 10, marginHorizontal: 10}}>
            <BarChart
            //   style={graphStyle}
              data={data}
              width={screenWidth}
              height={220}
              yAxisLabel="$"
              verticalLabelRotation={30}
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
            />
        </View>
                )
  }

  export default barChartExample;