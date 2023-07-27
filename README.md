# react-native-flatlist-withindicator

## Description

`react-native-flatlist-withindicator` is a package that provides a custom FlatList component with indicators. It allows you to display a horizontal list of items with customizable indicators that show the current active item.

## Installation

To install the package, run the following command:

`npm install react-native-reanimated react-native-gesture-handler`

`npm install react-native-flatlist-withindicator`

## Usage

```
import React from 'react'; import { View, StyleSheet } from 'react-native'; import FlatListWithIndicator from 'react-native-flatlist-withindicator';

const App = () => { const data = [ { id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }, { id: '3', title: 'Item 3' }, ];

return ( ); };

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', }, });

export default App;
```

## Props

## Props

| Name                       | Type         | Required/Optional | Description                                                                                          |
| -------------------------- | ------------ | ----------------- | ---------------------------------------------------------------------------------------------------- |
| `activeIndicatorColor`     | `string`     | Required          | The color of the active indicator.                                                                   |
| `inActiveIndicatorColor`   | `string`     | Required          | The color of the inactive indicators.                                                                |
| `data`                     | `Array<any>` | Required          | An array of data items to be rendered in the list.                                                   |
| `cardWidthPlusMarginValue` | `number`     | Required          | The width of each list item plus any margin or padding.                                              |
| `activeIndicatorWidth`     | `number`     | Optional          | The width of the active indicator. Default value is `32`.                                            |
| `inactiveIndicatorWidth`   | `number`     | Optional          | The width of the inactive indicators. Default value is `12`.                                         |
| `animationScaleFactor`     | `number`     | Optional          | The scaling and animation factor for the indicators. Default value is `1`.                           |
| `containerStyle`           | `ViewStyle`  | Optional          | Additional styles to be applied to the container view.                                               |
| `indicatorContainerStyle`  | `ViewStyle`  | Optional          | Additional styles to be applied to the indicator container view.                                     |
| `customsIndicatorStyle`    | `ViewStyle`  | Optional          | Additional styles to be applied to the custom indicators.                                            |
| `isRTL`                    | `boolean`    | Optional          | Determines if the layout is right-to-left. Default value is based on the device's language settings. |

## animationScaleFactor Prop

The animationScaleFactor prop is an optional number prop that determines the scaling and animation factor for the indicators. The default value is 1, It controls the scale and intensity of the animation applied to the indicators as the user scrolls through the list.

## RTL Support

This project provides support for RTL (Right-to-Left) systems

## Contributing

Contributions are welcome! If you have any suggestions or find a bug, please open an issue or submit a pull request.
