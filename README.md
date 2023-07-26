# react-native-flatlist-withindicator

## Description
`react-native-flatlist-withindicator` is a package that provides a custom FlatList component with indicators. It allows you to display a horizontal list of items with customizable indicators that show the current active item.

## Installation
To install the package, run the following command:
## Usage
 import React from 'react'; import { View, StyleSheet } from 'react-native'; import FlatListWithIndicator from 'react-native-flatlist-withindicator';

const App = () => { const data = [ { id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }, { id: '3', title: 'Item 3' }, ];

return ( ); };

const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center', }, });

export default App;

## Props

| Name                       | Type     | Description                                                                         |
| -------------------------- | -------- | ----------------------------------------------------------------------------------- |
| activeIndicatorColor       | string   | The color of the active indicator.                                                  |
| inActiveIndicatorColor     | string   | The color of the inactive indicators.                                               |
| data                       | Array    | The data array to be rendered in the FlatList.                                       |
| cardWidthPlusMarginValue   | number   | The width of each card item plus the margin between them.                            |
| longIndicatorWidth         | number   | The width of the long indicator. Default value: 32.                                  |
| shortIndicatorWidth        | number   | The width of the short indicator. Default value: 12.                                 |
| animationScaleFactor       | number   | The scaling and animation factor for the indicators. Default value: 1.               |

## Contributing
Contributions are welcome! If you have any suggestions or find a bug, please open an issue or submit a pull request.

