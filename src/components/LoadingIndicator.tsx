import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const LoadingIndicator = ({ style }: any): React.ReactElement<View> => (
  <View style={[style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

export default LoadingIndicator;
