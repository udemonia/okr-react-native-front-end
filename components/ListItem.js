import React, { useState, Context } from 'react';
import { Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from '../colors/lightMode'


const HEIGHT_OF_LIST_ITEM = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const translate_threshold_ofX = -SCREEN_WIDTH * 0.10;
const translate_delete_threshold = -SCREEN_WIDTH * 0.4;
const snapToDeleteButton = -SCREEN_WIDTH * 0.25;

const ListItem = ({
  task,
  onDismiss,
  simultaneousHandlers,
}) => {

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(HEIGHT_OF_LIST_ITEM);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);
  const startValue = useSharedValue(0)
  const panGesture = useAnimatedGestureHandler({

    onStart: ( event, context ) => {
      startValue.value = translateX.value
      console.log(`Starting Value`,startValue.value)
      context.translateX = translateX.value
    },


    onActive: ( event, context ) => {
        // translateX.value = event.translationX;

        translateX.value = event.translationX + context.translateX
        console.log('moving Value', translateX.value)

    },
    // onActive: (event, context) => {
    //   translateX.value = event.translationX + context.translateX
    // },
    onEnd: (start) => {
      const shouldBeDismissed = translateX.value < translate_delete_threshold;
      const shouldGoToSnapPoint = translateX.value < snapToDeleteButton && translateX.value < snapToDeleteButton

      if (startValue.value > translateX.value) {
        console.log('Greater than!')
        translateX.value = withTiming(0);
      }

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
        translateX.value = withTiming(-SCREEN_WIDTH * 0.15);
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
      translateX.value < translate_threshold_ofX - 20 ? 1 : 0
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
        <TouchableHighlight
          onPress={() => runOnJS(onDismiss)(task)}
        >
          <Ionicons
          //   style={{backgroundColor: 'red'}}
            name={'trash'}
            size={HEIGHT_OF_LIST_ITEM * 0.4}
            color={'red'}
          />
        </TouchableHighlight>
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
    right: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;