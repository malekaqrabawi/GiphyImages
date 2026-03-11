import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle, size = 22 }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(withSpring(1.4), withSpring(1));
    onToggle();
  };

  return (
    <AnimatedTouchable onPress={handlePress} style={[styles.button, animatedStyle]} activeOpacity={1}>
      <Animated.Text style={{ fontSize: size }}>
        {isFavorite ? '❤️' : '🤍'}
      </Animated.Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
  },
});

export default FavoriteButton;
