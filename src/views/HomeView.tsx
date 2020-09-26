/**
 *
 * @format
 */

import React from 'react';
import { Keyboard, SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { Button, Input, Layout, Text } from '@ui-kitten/components';

import opencage from 'opencage-api-client';

import LoadingIndicator from '../components/LoadingIndicator';
import GlobeIcon from '../components/GlobeIcon';
import RefreshIcon from '../components/RefreshIcon';
import GeocodingResult from '../components/GeocodinigResult';

import { OCD_API_KEY } from '../env.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {},
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
});

const HomeView = () => {
  const [query, setQuery] = React.useState('');
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [locations, setLocations] = React.useState([]);

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
        key: OCD_API_KEY,
        no_annotations: 1,
      });
      // console.log(response.results);
      setLocations(response.results);
    } catch (error) {
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

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.container}>
        <Layout style={styles.container}>
          <Text style={styles.text} category="h1">
            OpenCage Data Geocoder Test App 🌍
          </Text>
          <Input
            placeholder="Address or coordinates"
            value={query}
            onChangeText={(nextValue) => setQuery(nextValue)}
            onSubmitEditing={() => handlePressGeocode()}
          />
          <Text style={styles.text} appearance="hint">
            📪 Address, place name
          </Text>
          <Text style={styles.text} appearance="hint">
            🌍 Coordinates as latitude, longitude.
          </Text>

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
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default HomeView;
