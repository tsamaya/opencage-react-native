import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const handlePress = ({ item }: any) => {
    // console.log(item);
    navigation.navigate('Details', { location: item });
  };
  const renderItem = ({ item, index }: any) => {
    return (
      <ListItem
        title={` ${index + 1}. ${item.formatted}`}
        onPress={() => handlePress({ item })}
      />
    );
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
