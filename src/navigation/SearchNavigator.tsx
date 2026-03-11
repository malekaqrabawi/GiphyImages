import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from '../screens/Search/SearchScreen';
import ItemDetailsScreen from '../screens/ItemDetails/ItemDetailsScreen';
import { SearchStackParamList } from './types';
import { Colors } from '../theme/colors';

const Stack = createNativeStackNavigator<SearchStackParamList>();

const SearchNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: Colors.background },
      headerTintColor: Colors.text,
      headerTitleStyle: { fontWeight: '700' },
      headerBackTitle: '',
    }}
  >
    <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Search' }} />
    <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: 'Details' }} />
  </Stack.Navigator>
);

export default SearchNavigator;
