import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Layout, Text } from '@ui-kitten/components';
import MapboxGL from '@react-native-mapbox-gl/maps';

import BackIcon from '../components/icons/BackIcon';

import { MAPBOX_TOKEN } from '../env.json';

MapboxGL.setAccessToken(MAPBOX_TOKEN);

type MapParamList = {
  Map: {
    location: any;
  };
};

type MapScreenRouteProp = RouteProp<MapParamList, 'Map'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  layout: {
    flex: 1,
    paddingHorizontal: 20,
  },
  address: {
    marginVertical: 5,
  },
  backButton: {
    marginVertical: 20,
  },
  container: {
    height: 600,
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<MapScreenRouteProp>();
  const { location } = route.params;

  const { geometry } = location;
  const { lat, lng } = geometry;
  const coordinates = [lng, lat];
  const handlePressBack = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.screen}>
        <Layout style={styles.layout}>
          <Button
            style={styles.backButton}
            accessoryLeft={BackIcon}
            onPress={() => handlePressBack()}
            status="basic"
          >
            back
          </Button>
          <Text style={styles.address} category="s1">
            {location.formatted}
          </Text>
          <View style={styles.container}>
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera zoomLevel={14} centerCoordinate={coordinates} />
              <MapboxGL.PointAnnotation
                id={'id'}
                title="Test"
                coordinate={coordinates}
              >
                {/* <Image
                  source={require('../common/images/marker.png')}
                  style={{
                    flex: 1,
                    resizeMode: 'contain',
                    width: 25,
                    height: 25,
                  }}
                />*/}
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
          </View>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default MapScreen;
