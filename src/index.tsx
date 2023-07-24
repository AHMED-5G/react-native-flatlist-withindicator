/* eslint-disable react-native/no-inline-styles */
// export function multiply(a: number, b: number): Promise<number> {
//   return Promise.resolve(a * b);
// }import { FlatListProps, StyleSheet, View } from "react-native";

import React, { type JSXElementConstructor, type ReactElement } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import type { FlatListProps } from 'react-native';
import { View } from 'react-native';
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
  extends Omit<FlatListProps<ItemT>, 'horizontal' | 'renderItem'> {
  activeIndicatorColor: string | number;
  inActiveIndicatorColor: string | number;
  data: Array<ItemT>;
  CardComponent: (
    // item: ItemT
    item: ListRenderItemInfo<ItemT>
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
  cardWidthPlusMarginValue: number;
}

const FlatListWithIndicator = ({
  activeIndicatorColor,
  inActiveIndicatorColor,
  CardComponent,
  data,
  cardWidthPlusMarginValue,
  ...props
}: FlatListWithIndicatorInterface<any>) => {
  // const data = [1, 2, 3];
  const longIndicatorWidth = 32;
  const shortIndicatorWidth = 12;
  // const cardWidth = wwrosw(250);
  // const marginValue = wwrosw(16);
  // const cardWidthPlusMarginValue = cardWidth + marginValue;
  const firstInput = [0, cardWidthPlusMarginValue];
  const secondInput = [
    cardWidthPlusMarginValue,
    cardWidthPlusMarginValue * 1.5,
  ];
  const scrollXProgress = useSharedValue(0);

  const leftIndicatorRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollXProgress.value,
        firstInput,
        [longIndicatorWidth, shortIndicatorWidth],
        Extrapolation.CLAMP
      ),
      backgroundColor: interpolateColor(scrollXProgress.value, firstInput, [
        activeIndicatorColor,
        inActiveIndicatorColor,
      ]),
    };
  });

  const middleIndicatorRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue, cardWidthPlusMarginValue * 1.5],
        [shortIndicatorWidth, longIndicatorWidth, shortIndicatorWidth],
        Extrapolation.CLAMP
      ),
      backgroundColor: interpolateColor(
        scrollXProgress.value,
        [0, cardWidthPlusMarginValue, cardWidthPlusMarginValue * 1.5],
        [inActiveIndicatorColor, activeIndicatorColor, inActiveIndicatorColor]
      ),
    };
  });

  const rightIndicatorRStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        scrollXProgress.value,
        secondInput,
        [shortIndicatorWidth, longIndicatorWidth],
        Extrapolation.CLAMP
      ),
      backgroundColor: interpolateColor(scrollXProgress.value, secondInput, [
        inActiveIndicatorColor,
        activeIndicatorColor,
      ]),
    };
  });

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
        renderItem={({ ...itemProps }) => {
          return <CardComponent {...{ ...itemProps }} />;
        }}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.indicatorContainer}>
        <Animated.View
          style={[
            {
              width: longIndicatorWidth,
              borderRadius: 16,
              height: 4,
              backgroundColor: 'white',
            },
            leftIndicatorRStyle,
          ]}
        />
        <Animated.View
          style={[
            {
              marginLeft: 4,
              width: longIndicatorWidth,
              borderRadius: 16,
              height: 4,
            },
            middleIndicatorRStyle,
          ]}
        />
        <Animated.View
          style={[
            {
              marginLeft: 4,
              height: 4,
              borderRadius: 16,
            },
            rightIndicatorRStyle,
          ]}
        />
      </View>
    </View>
  );
};

export { FlatListWithIndicator };

const styles = StyleSheet.create({
  indicatorContainer: { marginTop: 16, flexDirection: 'row' },
});
