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
          activeIndicatorColor={'#6a154e'}
          inActiveIndicatorColor={'lightgrey'}
          renderItem={({ item }) => <Card item={item} />}
          data={data}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatListWithRectangleIndicator
          activeIndicatorColor={'#6a154e'}
          inActiveIndicatorColor={'lightgrey'}
          renderItem={({ item }) => <Card item={item} />}
          data={data}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          keyExtractor={(_, index) => index.toString()}
          animationScaleFactor={0.57}
        />
      </View>
      <View style={styles.flatListContainer}>
        <FlatListWithCircularIndicator
          activeIndicatorColor={'#6a154e'}
          inActiveIndicatorColor={'lightgrey'}
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
