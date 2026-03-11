import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ItemDetailsScreen from '../screens/ItemDetails/ItemDetailsScreen';
import { HomeStackParamList } from './types';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '700' },
      headerBackTitle: '',
    }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Trending' }} />
    <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Details' }} />
  </Stack.Navigator>
);

export default HomeNavigator;
