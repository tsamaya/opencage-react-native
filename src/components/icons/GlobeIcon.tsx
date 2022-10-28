import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';

const GlobeIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => <Icon {...props} name="globe-outline" />;

export default GlobeIcon;
