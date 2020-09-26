import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, List, ListItem } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
});

type GeocodingResultProps = {
  data: Array<any>;
};

const GeocodingResult = ({ data }: GeocodingResultProps) => {
  const renderItem = ({ item, index }: any) => {
    return <ListItem title={` ${index + 1}. ${item.formatted}`} />;
  };

  return (
    <List
      style={styles.container}
      data={data}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default GeocodingResult;
