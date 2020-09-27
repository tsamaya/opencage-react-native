import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';
import {
  Button,
  Card,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
} from '@ui-kitten/components';

import BackIcon from '../components/BackIcon';

type DetailsParamList = {
  Details: {
    location: any;
  };
};

type DetailsScreenRouteProp = RouteProp<DetailsParamList, 'Details'>;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  list: {
    maxHeight: 600,
  },
  address: {
    marginVertical: 5,
  },
  backButton: {
    marginVertical: 20,
  },
});

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();
  const { location } = route.params;

  const { components } = location;

  const data = _.map(components, (value, key) => ({ key, value }));

  console.log({ data });

  const handlePressBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }: any) => {
    if (!item) {
      return null;
    }
    return <ListItem title={`${item.value}`} description={`${item.key}`} />;
  };

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={styles.screen}>
        <Layout style={styles.container}>
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
          <Card>
            <List
              style={styles.list}
              data={data}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          </Card>
        </Layout>
      </SafeAreaView>
    </>
  );
};

export default DetailScreen;
