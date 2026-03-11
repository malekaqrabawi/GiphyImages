import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '../../theme/colors';
import { BorderRadius, Spacing } from '../../theme/spacing';

const SkeletonCard: React.FC = () => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 900 }), -1, true);
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      shimmer.value,
      [0, 1],
      [Colors.skeleton, Colors.skeletonHighlight],
    ),
  }));

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, animatedStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.titleLine, animatedStyle]} />
        <Animated.View style={[styles.descLine, animatedStyle]} />
        <Animated.View style={[styles.descLineShort, animatedStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
  },
  content: {
    padding: Spacing.md,
  },
  titleLine: {
    height: 16,
    borderRadius: 4,
    marginBottom: Spacing.sm,
    width: '70%',
  },
  descLine: {
    height: 12,
    borderRadius: 4,
    marginBottom: 6,
    width: '100%',
  },
  descLineShort: {
    height: 12,
    borderRadius: 4,
    width: '50%',
  },
});

export default SkeletonCard;
