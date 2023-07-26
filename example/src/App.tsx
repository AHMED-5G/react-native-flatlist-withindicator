import * as React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FlatListWithIndicator } from 'react-native-flatlist-withindicator';

const marginValue = 10;
const cardWidth = 200;

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.flatListContainer}>
        <View>
          <Text style={styles.text}>animation Scale Factor={0.7}</Text>
        </View>
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
          animationScaleFactor={0.7}
        />
      </View>
      <View style={styles.flatListContainer}>
        <View>
          <Text style={styles.text}>animation Scale Factor={0.5}</Text>
        </View>
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
          data={[1, 2, 3]}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          animationScaleFactor={0.5}
        />
      </View>
      <View style={styles.flatListContainer}>
        <View>
          <Text style={styles.text}>animation Scale Factor={1}</Text>
        </View>
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
          data={[1, 2, 3]}
          cardWidthPlusMarginValue={cardWidth + marginValue}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  flatListContainer: { marginTop: 30 },
  text: { marginLeft: 10, fontSize: 14, fontWeight: '500' },
});
