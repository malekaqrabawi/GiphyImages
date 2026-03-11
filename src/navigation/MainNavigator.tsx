import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAppSelector } from '../hooks/useAppDispatch';
import HomeNavigator from './HomeNavigator';
import SearchNavigator from './SearchNavigator';
import FavoritesNavigator from './FavoritesNavigator';
import { MainTabParamList } from './types';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabIconProps {
  name: string;
  focused: boolean;
  badge?: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, badge }) => (
  <View style={styles.iconContainer}>
    <Icon 
      name={name} 
      size={24} 
      color={focused ? Colors.primary : Colors.textMuted} 
    />
    {badge !== undefined && badge > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
      </View>
    )}
  </View>
);

const HomeTabIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
);

const SearchTabIcon = ({ focused }: { focused: boolean }) => (
  <TabIcon name={focused ? 'search' : 'search-outline'} focused={focused} />
);

const MainNavigator: React.FC = () => {
  const favCount = useAppSelector(state => state.favorites.favorites.length);
  const insets = useSafeAreaInsets();

  const renderFavoritesIcon = React.useCallback(
    ({ focused }: { focused: boolean }) => (
      <TabIcon name={focused ? 'heart' : 'heart-outline'} focused={focused} badge={favCount} />
    ),
    [favCount]
  );

  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, { paddingBottom: 8 + insets.bottom }],
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchNavigator}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: SearchTabIcon,
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesNavigator}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: renderFavoritesIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBar,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
});

export default MainNavigator;
