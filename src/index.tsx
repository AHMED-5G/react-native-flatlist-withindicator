/* eslint-disable react-native/no-inline-styles */
// export function multiply(a: number, b: number): Promise<number> {
//   return Promise.resolve(a * b);
// }import { FlatListProps, StyleSheet, View } from "react-native";

import React from 'react';
import type { FlatListProps } from 'react-native';
import { View } from 'react-native';
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface FlatListWithIndicatorInterface<ItemT = any>
  extends Omit<FlatListProps<ItemT>, 'horizontal'> {
  // extends Omit<FlatListProps<ItemT>, 'horizontal' | 'renderItem'> {
  activeIndicatorColor: string | number;
  inActiveIndicatorColor: string | number;
  data: Array<ItemT>;
  cardWidthPlusMarginValue: number;
  longIndicatorWidth?: number;
  shortIndicatorWidth?: number;
  animationScaleFactor: number;
}

const FlatListWithIndicator = ({
  activeIndicatorColor,
  inActiveIndicatorColor,
  data,
  cardWidthPlusMarginValue,
  longIndicatorWidth = 32,
  shortIndicatorWidth = 12,
  animationScaleFactor = 1,
  ...props
}: FlatListWithIndicatorInterface<any>) => {
  const scrollXProgress = useSharedValue(0);

  const firstIndicatorRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue * animationScaleFactor],
        [longIndicatorWidth, shortIndicatorWidth],
        Extrapolation.CLAMP
      ),

      backgroundColor: interpolateColor(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue * animationScaleFactor],
        [activeIndicatorColor, inActiveIndicatorColor]
      ),
    };
  });

  function MedWithIndex(index: number) {
    const myInput = [
      ((cardWidthPlusMarginValue * index) / 2) * animationScaleFactor,
      cardWidthPlusMarginValue * index * animationScaleFactor,
      cardWidthPlusMarginValue * 2 * index * animationScaleFactor,
    ];
    const medIndicatorRStyle = useAnimatedStyle(() => {
      return {
        width: interpolate(
          scrollXProgress.value,
          myInput,
          // [
          //   ((cardWidthPlusMarginValue * animationScaleFactor) / 2) * index,
          //   cardWidthPlusMarginValue * animationScaleFactor * index,
          //   cardWidthPlusMarginValue * 2 * animationScaleFactor * index,
          // ],
          [shortIndicatorWidth, longIndicatorWidth, shortIndicatorWidth],
          Extrapolation.CLAMP
        ),
        backgroundColor: interpolateColor(
          scrollXProgress.value,
          myInput,
          // [
          //   ((cardWidthPlusMarginValue * animationScaleFactor) / 2) * index,
          //   cardWidthPlusMarginValue * animationScaleFactor * index,
          //   cardWidthPlusMarginValue * 2 * animationScaleFactor * index,
          // ],
          [inActiveIndicatorColor, activeIndicatorColor, inActiveIndicatorColor]
        ),
      };
    });
    return medIndicatorRStyle;
  }

  const handler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollXProgress.value = event.contentOffset.x;
    },
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Animated.FlatList
        {...props}
        horizontal
        data={data}
        onScroll={handler}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.indicatorContainer}>
        {data.length > 0 &&
          data.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    borderRadius: 16,
                    height: 4,
                    margin: 2,
                  },
                  index === 0 ? firstIndicatorRStyle : MedWithIndex(index),
                ]}
              />
            );
          })}
      </View>
    </View>
  );
};

export { FlatListWithIndicator };

const styles = StyleSheet.create({
  indicatorContainer: { marginTop: 16, flexDirection: 'row' },
});
