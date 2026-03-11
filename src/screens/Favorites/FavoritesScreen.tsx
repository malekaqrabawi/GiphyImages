import React, { useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useFavorites } from '../../hooks/useFavorites';
import GiphyCard from '../../components/GiphyCard/GiphyCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { GifItem } from '../../types/giphy.types';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';
import { FavoritesStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<FavoritesStackParamList, 'FavoritesScreen'>;

const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { favorites, isFavorite, toggleFavorite, removeAll } = useFavorites();

  const handleRemoveAll = () => {
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove All', style: 'destructive', onPress: removeAll },
      ],
    );
  };

  const handlePress = useCallback(
    (item: GifItem) => navigation.navigate('ItemDetails', { item, sharedTag: `favorites_${item.id}` }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: GifItem }) => (
      <GiphyCard
        item={item}
        isFavorite={isFavorite(item.id)}
        onPress={handlePress}
        onToggleFavorite={toggleFavorite}
        tagPrefix="favorites"
      />
    ),
    [isFavorite, toggleFavorite, handlePress],
  );

  const keyExtractor = useCallback((item: GifItem) => item.id, []);


  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {favorites.length > 0 && (
        <Animated.View entering={FadeInDown.springify()} style={styles.header}>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favorites.length} saved</Text>
          </View>
          <TouchableOpacity onPress={handleRemoveAll} style={styles.removeAllButton}>
            <Text style={styles.removeAllText}>Remove All</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={
          <EmptyState
            emoji="🤍"
            title="No favorites yet"
            subtitle="Tap the heart on any GIF to save it here"
          />
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  countBadge: {
    backgroundColor: Colors.primary + '22',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  countText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  removeAllButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  removeAllText: {
    color: Colors.error,
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
});

export default FavoritesScreen;
