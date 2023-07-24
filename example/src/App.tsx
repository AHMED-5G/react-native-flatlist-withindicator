/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { FlatListWithIndicator } from 'react-native-flatlist-withindicator';

const marginValue = 16;
const cardWidth = 150;
export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();

  // React.useEffect(() => {
  //   multiply(3, 7).then(setResult);
  // }, []);
  return (
    <View style={styles.container}>
      <FlatListWithIndicator
        activeIndicatorColor={'#005596'}
        inActiveIndicatorColor={'#E5EEF5'}
        CardComponent={({ item }) => (
          <View style={styles.cardContainer}>
            <Text>{item}</Text>
          </View>
        )}
        data={[1, 2, 3]}
        cardWidthPlusMarginValue={cardWidth + marginValue}
        showsHorizontalScrollIndicator={false}
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
