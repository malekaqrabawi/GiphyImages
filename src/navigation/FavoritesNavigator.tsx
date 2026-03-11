import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import ItemDetailsScreen from '../screens/ItemDetails/ItemDetailsScreen';
import { FavoritesStackParamList } from './types';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator<FavoritesStackParamList>();

const FavoritesNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '700' },
      headerBackTitle: '',
    }}
  >
    <Stack.Screen
      name="FavoritesScreen"
      component={FavoritesScreen}
      options={{ title: 'Favorites' }}
    />
    <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Details' }} />
  </Stack.Navigator>
);

export default FavoritesNavigator;
