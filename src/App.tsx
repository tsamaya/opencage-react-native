import React from 'react';

import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { NavigationContainer } from '@react-navigation/native';

import { default as theme } from './assets/theme/theme.json'; // <-- Import app theme

import AppNavigator from './views/Navigation';

export default (): JSX.Element => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <AppNavigator />
    </ApplicationProvider>
  </>
);
