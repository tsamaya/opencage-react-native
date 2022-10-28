import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';

const RefreshIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => <Icon {...props} name="refresh-outline" />;

export default RefreshIcon;
