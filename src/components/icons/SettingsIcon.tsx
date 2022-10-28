import React from 'react';
import { ImageProps } from 'react-native';
import { Icon } from '@ui-kitten/components';

const SettingsIcon = (
  props?: Partial<ImageProps>,
): React.ReactElement<ImageProps> => (
  <Icon {...props} name="settings-2-outline" />
);

export default SettingsIcon;
