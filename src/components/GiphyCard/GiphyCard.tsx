import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { SharedTransition } from 'react-native-reanimated';
import { GifItem } from '../../types/giphy.types';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import { Colors } from '../../theme/colors';
import { Spacing, BorderRadius } from '../../theme/spacing';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface GiphyCardProps {
  item: GifItem;
  isFavorite: boolean;
  onPress: (item: GifItem) => void;
  onToggleFavorite: (item: GifItem) => void;
  tagPrefix: string;
}

const sharedTransition = SharedTransition.springify().damping(20).stiffness(180);

const GiphyCard: React.FC<GiphyCardProps> = ({
  item,
  isFavorite,
  onPress,
  onToggleFavorite,
  tagPrefix,
}) => {
  const imageUrl = item.images?.fixed_width?.url || item.images?.original?.url || '';
  const sharedTag = `${tagPrefix}_${item.id}`;

  const handlePress = useCallback(() => onPress(item), [onPress, item]);
  const handleToggleFavorite = useCallback(() => onToggleFavorite(item), [onToggleFavorite, item]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.85}>
        <AnimatedImage
          sharedTransitionTag={sharedTag}
          sharedTransitionStyle={sharedTransition}
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title || 'Untitled'}
            </Text>
            <FavoriteButton isFavorite={isFavorite} onToggle={handleToggleFavorite} />
          </View>
          <Text style={styles.description} numberOfLines={2}>
            {item.slug?.replace(/-/g, ' ') || 'No description available'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: Colors.skeleton,
  },
  content: {
    padding: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

export default memo(GiphyCard);
