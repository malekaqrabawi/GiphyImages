import React, { useEffect, useCallback, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { performSearch, setQuery, resetSearch } from '../../store/slices/searchSlice';
import { useFavorites } from '../../hooks/useFavorites';
import { useDebounce } from '../../hooks/useDebounce';
import GiphyCard from '../../components/GiphyCard/GiphyCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { GifItem } from '../../types/giphy.types';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { SearchStackParamList } from '../../navigation/types';

type NavProp = NativeStackNavigationProp<SearchStackParamList, 'SearchScreen'>;

const SearchScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const { query, results, loading, loadingMore, error, offset, hasMore } = useAppSelector(
    state => state.search,
  );
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const debouncedQuery = useDebounce(query, 500);
  const activeSearchRef = useRef<any>(null);

  useEffect(() => {
    if (activeSearchRef.current?.abort) {
      activeSearchRef.current.abort();
    }
    if (debouncedQuery.trim().length >= 1) {
      activeSearchRef.current = dispatch(performSearch({ query: debouncedQuery.trim(), offset: 0 }));
    } else {
      activeSearchRef.current = null;
      dispatch(resetSearch());
    }
  }, [debouncedQuery, dispatch]);

  const handleLoadMore = useCallback(() => {
    if (!loadingMore && hasMore && !loading && query.trim()) {
      dispatch(performSearch({ query: query.trim(), offset }));
    }
  }, [dispatch, loadingMore, hasMore, loading, query, offset]);

  const handlePress = useCallback(
    (item: GifItem) => navigation.navigate('ItemDetails', { item, sharedTag: `search_${item.id}` }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: GifItem }) => (
      <GiphyCard
        item={item}
        isFavorite={isFavorite(item.id)}
        onPress={handlePress}
        onToggleFavorite={toggleFavorite}
        tagPrefix="search"
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


  const renderContent = () => {
    if (loading || query !== debouncedQuery) {
      return (
        <View style={styles.skeletonList}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      );
    }

    if (error) {
      return (
        <EmptyState
          emoji="⚠️"
          title="Search failed"
          subtitle={error}
          onRetry={() => dispatch(performSearch({ query: query.trim(), offset: 0 }))}
        />
      );
    }

    if (!query.trim()) {
      return (
        <EmptyState emoji="🔍" title="Search for GIFs" subtitle="Type something to get started" />
      );
    }

    return (
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        extraData={favorites}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <EmptyState emoji="😔" title="No results found" subtitle={`Nothing for "${query}"`} />
        }
        contentContainerStyle={{ ...styles.listContent, paddingBottom: Spacing.sm + insets.bottom }}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={text => dispatch(setQuery(text))}
        onClear={() => {
          dispatch(setQuery(''));
          dispatch(resetSearch());
        }}
      />
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  skeletonList: {
    paddingTop: Spacing.sm,
  },
  listContent: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  footer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
});

export default SearchScreen;
