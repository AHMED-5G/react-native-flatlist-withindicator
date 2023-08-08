# react-native-flatlist-withindicator

![npm](https://img.shields.io/npm/dt/react-native-flatlist-withindicator) ![npm](https://img.shields.io/npm/dw/react-native-flatlist-withindicator)

## Description

`react-native-flatlist-withindicator` is a package that extends the functionality of the original React Native FlatList component. It provides customizable indicators to display the current active item in a horizontal list.

<img src='./src/assets/screen.gif' width=370 height=700  />

## Features

- Customize indicators to show the current active item
- Enhance user experience with visual indicators
- Built on top of the original React Native FlatList component

## Installation

To install the package, run the following command:

official documentation on how to [Installation - React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation#installing-the-package)

`npm install react-native-flatlist-withindicator@0.1.2`
<!-- `npm install react-native-flatlist-withindicator` -->

## Usage

```ts
import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import {
  FlatListWithCircularIndicator,
  FlatListWithRectangleIndicator,
} from 'react-native-flatlist-withindicator';

const marginValue = 10;
const cardWidth = 200;

const Card = ({ item }) => {
  return (
    <View
      style={[
        { marginRight: marginValue, width: cardWidth },
        styles.cardContainer,
      ]}
    >
      <Text style={styles.cardText}>{item}</Text>
    </View>
  );
};

export default function App() {
  const data = [1, 2, 3];
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatListWithRectangleIndicator
          renderItem={({ item }) => <Card item={item} />}
          data={data}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatListWithRectangleIndicator
          renderItem={({ item }) => <Card item={item} />}
          data={data}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          keyExtractor={(_, index) => index.toString()}
          animationScaleFactor={0.57}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatListWithCircularIndicator
          renderItem={({ item }) => <Card item={item} />}
          data={data}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          keyExtractor={(_, index) => index.toString()}
          animationScaleFactor={0.57}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'lightblue',
    height: 200,
    borderRadius: 10,
  },
  flatListContainer: { marginTop: 30 },
  text: { marginLeft: 10, fontSize: 14, fontWeight: '500' },
  cardText: { fontSize: 20, fontWeight: '800' },
});
```

## Shared Props

Shared Props Table:

| Name                       | Type              | Required/Optional | Description                                                                                          |
| -------------------------- | ----------------- | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `activeIndicatorColor`     | `string`          | Optional          | The color of the active indicator.                                                                   |
| `inActiveIndicatorColor`   | `string`          | Optional          | The color of the inactive indicators.                                                                |
| `data`                     | `Array<any>`      | Required          | An array of data items to be rendered in the list.                                                   |
| `cardWidthPlusMarginValue` | `number`          | Required          | The width of each list item plus any margin or padding.                                              |
| `animationScaleFactor`     | `number`          | Optional          | The scaling and animation factor for the indicators. Default value is `1`.                           |
| `containerStyle`           | `ViewStyle`       | Optional          | Additional styles to be applied to the container view.                                               |
| `indicatorContainerStyle`  | `ViewStyle`       | Optional          | Additional styles to be applied to the indicator container view.                                     |
| `customsIndicatorStyle`    | `ViewStyle`       | Optional          | Additional styles to be applied to the custom indicators.                                            |
| `isRTL`                    | `boolean`         | Optional          | Determines if the layout is right-to-left. Default value is based on the device's language settings. |
| `passOnScrollEvent`        | `(event) => void` | Optional          | Passes the `onScroll` event from the parent component to the child component.                        |

Note: Any other props accepted by the React Native FlatList component can also be used with `react-native-flatlist-withindicator`. However, please be aware that the following props are excluded from the standard FlatList component:

- `horizontal`: This prop is not applicable since it is designed to display a horizontal list.

- `showsHorizontalScrollIndicator`: This prop is not applicable since it handles its own indicator display.

- The `onScroll` prop is not applicable . Instead, you can use the `passOnScrollEvent` prop to achieve the `onScroll` functionality.

## FlatList With Rectangle Indicator Props (Extends Shared Props):

| Name                     | Type     | Required/Optional | Description                                               |
| ------------------------ | -------- | ----------------- | --------------------------------------------------------- |
| `activeIndicatorWidth`   | `number` | Optional          | The width of the active indicator. Default value is `32`  |
| `inactiveIndicatorWidth` | `number` | Optional          | The width of the inactive indicator.Default value is `12` |

## FlatList With Circular Indicator Props (Extends Shared Props):

| Name           | Type     | Required/Optional | Description                                                |
| -------------- | -------- | ----------------- | ---------------------------------------------------------- |
| `circleRadius` | `number` | Optional          | The radius of the circular indicator.Default value is `10` |

## animationScaleFactor Prop

The animationScaleFactor prop is an optional number prop that determines the scaling and animation factor for the indicators. The default value is 1, It controls the scale and intensity of the animation applied to the indicators as the user scrolls through the list.

## RTL Support

This package provides support for RTL (Right-to-Left) systems

## Contributing

Contributions are welcome! If you have any suggestions or find a bug, please open an issue or submit a pull request.
