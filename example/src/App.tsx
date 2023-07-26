/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatListWithIndicator } from 'react-native-flatlist-withindicator';

const marginValue = 10;
const cardWidth = 200;

export default function App() {
  return (
    <View style={styles.container}>
      <FlatListWithIndicator
        activeIndicatorColor={'#6a154e'}
        inActiveIndicatorColor={'lightgrey'}
        renderItem={({ item }) => {
          return (
            <View style={[styles.cardContainer]}>
              <Text>{item}</Text>
            </View>
          );
        }}
        data={[1, 2, 3, 4, 5]}
        cardWidthPlusMarginValue={cardWidth + marginValue}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'pink',
    marginRight: marginValue,
    width: cardWidth,
    height: 200,
    borderRadius: 10,
  },
});
