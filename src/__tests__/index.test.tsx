import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FlatListWithIndicator } from '../index';

it.todo('write a test');

describe('FlatListWithIndicator', () => {
  const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const cardWidthPlusMarginValue = 100;
  const activeIndicatorColor = 'green';
  const inActiveIndicatorColor = 'red';

  it('renders without crashing', () => {
    render(
      <FlatListWithIndicator
        renderItem={undefined}
        activeIndicatorColor={activeIndicatorColor}
        inActiveIndicatorColor={inActiveIndicatorColor}
        data={data}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
      />
    );
  });

  it('renders the correct number of indicators', () => {
    const { getAllByTestId } = render(
      <FlatListWithIndicator
        renderItem={undefined}
        activeIndicatorColor={activeIndicatorColor}
        inActiveIndicatorColor={inActiveIndicatorColor}
        data={data}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
      />
    );

    const indicators = getAllByTestId('indicator');
    expect(indicators.length).toBe(data.length);
  });

  it('updates the scrollXProgress value on scroll', () => {
    const { getByTestId } = render(
      <FlatListWithIndicator
        activeIndicatorColor={activeIndicatorColor}
        inActiveIndicatorColor={inActiveIndicatorColor}
        data={data}
        cardWidthPlusMarginValue={cardWidthPlusMarginValue}
        renderItem={undefined}
      />
    );

    const flatList = getByTestId('flat-list');
    fireEvent.scroll(flatList, { nativeEvent: { contentOffset: { x: 100 } } });

    // Check if the scrollXProgress value has been updated
    // You can access the scrollXProgress value using the useRef hook or a state variable
  });
});
