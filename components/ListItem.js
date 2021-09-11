import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TaskInterface } from '../App';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from '../colors/lightMode'


const HEIGHT_OF_LIST_ITEM = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const translate_threshold_ofX = -SCREEN_WIDTH * 0.25;

const ListItem = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {

    console.log('Here is your task,', task)

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(HEIGHT_OF_LIST_ITEM);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const snapPoints = [-SCREEN_WIDTH, -100, 0]

  const panGesture = useAnimatedGestureHandler({
      
    onActive: (event) => {

      if (translateX.value <= 0.1) {
        translateX.value = event.translationX;
      }
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < translate_threshold_ofX;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);

        itemHeight.value = withTiming(0);

        marginVertical.value = withTiming(0);

        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {

    const opacity = withTiming(
      translateX.value < translate_threshold_ofX ? 1 : 0
    );
    return { opacity };

  });

  const rObjectiveContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.objectiveContainer, rObjectiveContainerStyle]}>
      <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
        <Ionicons
        //   style={{backgroundColor: 'red'}}
          name={'trash'}
          size={HEIGHT_OF_LIST_ITEM * 0.4}
          color={'red'}
        />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}
      >
        <Animated.View style={[styles.objectiveBox, rStyle]}>
            <View>

                <Text style={styles.taskTitle}>{task.name}</Text>


                <Text style={styles.taskTitle}>{task.description}</Text>


                <Text></Text>

            </View>    

        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  objectiveContainer: {
    width: '100%',
    alignItems: 'center',
  },
  objectiveBox: {
    width: '90%',
    height: HEIGHT_OF_LIST_ITEM,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: colors.mediumPurple,
    borderRadius: 4,

    // ios
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Android
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
    color: 'white'
  },
  iconContainer: {
    height: HEIGHT_OF_LIST_ITEM,
    width: HEIGHT_OF_LIST_ITEM,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;