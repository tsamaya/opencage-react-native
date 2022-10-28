import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';

const BackIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => (
  <Icon {...props} name="arrow-back-outline" />
);

export default BackIcon;
