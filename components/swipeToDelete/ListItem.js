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
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';


const HEIGHT_OF_LIST_ITEM = 70;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const translate_threshold_ofX = -SCREEN_WIDTH * 0.10;
const translate_delete_threshold = -SCREEN_WIDTH * 0.4;
const snapToDeleteButton = -SCREEN_WIDTH * 0.25;

const ListItem = ({
  objectiveInfo,
  deleteItem,
  JWTtoken,
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
      context.translateX = translateX.value
    },


    onActive: ( event, context ) => {
        translateX.value = event.translationX + context.translateX
    },

    onEnd: (start) => {
      const shouldBeDismissed = translateX.value < translate_delete_threshold;
      const shouldGoToSnapPoint = translateX.value < snapToDeleteButton && translateX.value < snapToDeleteButton

      if (startValue.value < translateX.value) {
        translateX.value = withTiming(0);
        return

      } else if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss);
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
    <View>
      <Animated.View style={[styles.objectiveContainer, rObjectiveContainerStyle]}>
        <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => onDismiss(JWTtoken, objectiveInfo._id )}
          >
            <Feather
              name={'x-circle'}
              size={36}
              color={'red'}
            />
          </TouchableHighlight>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}
        >
          <Animated.View style={[styles.objectiveBox, rStyle]}>

              <View style={styles.objectivenameRow}>
                  <Feather style={styles.objectiveIcon} name="target" size={28} color="white" />
                  <Text style={styles.taskTitle}>{objectiveInfo.name}</Text>
              </View>  
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  objectiveContainer: {
    width: '100%',
    alignItems: 'center',
  },
  objectiveBox: {
    width: '100%',
    height: HEIGHT_OF_LIST_ITEM,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#B388EB',
    borderRadius: 5
  },
  taskTitle: {
    paddingLeft: 3,
    fontSize: 16,
    color: 'white',
    maxWidth: '70%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    marginLeft: 4,
    fontSize: 18,
    fontFamily: 'Nunito_400Regular'
  },
  objectivenameRow: {
    paddingHorizontal: 5,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    height: HEIGHT_OF_LIST_ITEM,
    width: HEIGHT_OF_LIST_ITEM,
    position: 'absolute',
    right: '.1%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,



  },
});

export default ListItem;