/**
 *
 * @format
 */

import React from 'react';
import { Keyboard, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Input,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import opencage from 'opencage-api-client';
import LoadingIndicator from '../components/LoadingIndicator';
import GlobeIcon from '../components/icons/GlobeIcon';
import RefreshIcon from '../components/icons/RefreshIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import GeocodingResult from '../components/GeocodinigResult';

import { OCD_API_KEY_TEST } from '../env.json';

const API_KEY_STORAGE = '@api_Key';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
  },
  input: {
    marginVertical: 15,
  },
  text: {
    marginVertical: 5,
  },
  geocodeButton: {
    marginTop: 20,
  },
  resetButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  settingsButton: {
    margin: 2,
  },
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
});

const HomeScreen = () => {
  const [query, setQuery] = React.useState('');
  const [apiKey, setApiKey] = React.useState(OCD_API_KEY_TEST);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [settingsVisible, setSettingsVisible] = React.useState(false);

  const handlePressGeocode = async () => {
    if (!query) {
      console.log('no input');
      return;
    }
    Keyboard.dismiss();
    setSubmitting(true);
    try {
      const response = await opencage.geocode({
        q: query,
        key: apiKey,
        no_annotations: 1,
      });
      console.log(response.results);
      setLocations(response.results);
    } catch (error: any) {
      console.log(error.toString());
      setLocations([]);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePressReset = () => {
    setLocations([]);
    setQuery('');
  };

  const storeApiKeyInStorage = async (value: string) => {
    try {
      await AsyncStorage.setItem(API_KEY_STORAGE, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getApiKeyFromStage = async () => {
    try {
      const value = await AsyncStorage.getItem(API_KEY_STORAGE);
      if (value !== null) {
        console.log(`restore API key ${value}`);
        setApiKey(value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const dismissSettings = () => {
    setSettingsVisible(false);
    console.log({ apiKey });
    if (apiKey && apiKey !== OCD_API_KEY_TEST) {
      console.log('store');
      storeApiKeyInStorage(apiKey);
    } else {
      console.log('reset default');
      setApiKey(OCD_API_KEY_TEST);
    }
  };

  React.useEffect(() => {
    (async () => {
      await getApiKeyFromStage();
    })();
  }, []);

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.screen}>
        <Layout style={styles.container}>
          <Text style={styles.title} category="h1">
            OpenCage Data Geocoder{'\n'}Test App 🌍
          </Text>

          <Text style={styles.text} category="s1">
            Geocode
          </Text>

          <Text style={styles.text} appearance="hint">
            📪 Address, place name, or
          </Text>
          <Text style={styles.text} appearance="hint">
            🌍 Coordinates as latitude, longitude.
          </Text>

          {apiKey === OCD_API_KEY_TEST && (
            <Text style={styles.text} category="s2">
              ⚠️ Test KEY, it will always return `Friedrich-Ebert-Straße`. Press
              settings and enter you API Key
            </Text>
          )}

          <Button
            style={styles.resetButton}
            accessoryLeft={SettingsIcon}
            onPress={() => setSettingsVisible(true)}
            status="basic"
          >
            Settings
          </Button>

          <Input
            autoFocus
            style={styles.input}
            placeholder="Address or coordinates"
            value={query}
            onChangeText={(nextValue) => setQuery(nextValue)}
            onSubmitEditing={() => handlePressGeocode()}
          />
          <Button
            style={styles.geocodeButton}
            accessoryLeft={isSubmitting ? LoadingIndicator : GlobeIcon}
            onPress={() => handlePressGeocode()}
          >
            Geocode
          </Button>

          <Button
            style={styles.resetButton}
            accessoryLeft={RefreshIcon}
            disabled={query.length === 0}
            onPress={() => handlePressReset()}
            status="basic"
          >
            Reset
          </Button>

          {locations.length > 0 && <GeocodingResult data={locations} />}

          <Modal
            visible={settingsVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => dismissSettings()}
          >
            <Card disabled={true}>
              <Text>Your OpenCage API key 🔑</Text>
              <Input
                autoFocus
                style={styles.input}
                placeholder="OPENCAGE API KEY"
                value={apiKey === OCD_API_KEY_TEST ? '' : apiKey}
                onChangeText={(nextValue) => setApiKey(nextValue)}
                onSubmitEditing={() => dismissSettings()}
              />
              <Button onPress={() => dismissSettings()}>SET</Button>
            </Card>
          </Modal>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
