import React from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import { default as theme } from './assets/theme/theme.json'; // <-- Import app theme

import HomeView from './views/HomeView';

export default (): JSX.Element => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <HomeView />
    </ApplicationProvider>
  </>
);
