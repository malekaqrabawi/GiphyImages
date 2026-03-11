import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { loadTrending } from '../../store/slices/giphySlice';
import { useFavorites } from '../../hooks/useFavorites';
import GiphyCard from '../../components/GiphyCard/GiphyCard';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { GifItem } from '../../types/giphy.types';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { HomeStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavProp>();
  const { gifs, loading, loadingMore, error, offset, hasMore } = useAppSelector(
    state => state.giphy,
  );
  const { favorites, isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    dispatch(loadTrending(0));
  }, [dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      dispatch(loadTrending(offset));
    }
  }, [dispatch, loadingMore, hasMore, loading, offset]);

  const handlePress = useCallback(
    (item: GifItem) => navigation.navigate('ItemDetails', { item, sharedTag: `home_${item.id}` }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: GifItem }) => (
      <GiphyCard
        item={item}
        isFavorite={isFavorite(item.id)}
        onPress={handlePress}
        onToggleFavorite={toggleFavorite}
        tagPrefix="home"
      />
    ),
    [isFavorite, toggleFavorite, handlePress],
  );

  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }, [loadingMore]);

  const keyExtractor = useCallback((item: GifItem) => item.id, []);


  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <EmptyState
          emoji="⚠️"
          title="Something went wrong"
          subtitle={error}
          onRetry={() => dispatch(loadTrending(0))}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <FlatList
        data={gifs}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={favorites}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState emoji="🎞" title="No GIFs found" subtitle="Pull to refresh" />
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
  listContent: {
    paddingTop: Spacing.sm,
    // paddingBottom: Spacing.sm,
  },
  footer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
});

export default HomeScreen;
