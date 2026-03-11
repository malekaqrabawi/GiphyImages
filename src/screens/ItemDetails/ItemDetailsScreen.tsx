import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, SlideInUp, SharedTransition } from 'react-native-reanimated';
import { RouteProp, useRoute } from '@react-navigation/native';

const sharedTransition = SharedTransition.springify().damping(20).stiffness(180);
import { useFavorites } from '../../hooks/useFavorites';
import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';
import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';
import { HomeStackParamList } from '../../navigation/types';

type RouteProps = RouteProp<HomeStackParamList, 'ItemDetails'>;

interface InfoRowProps {
  label: string;
  value: string;
  pressable?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, pressable }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    {pressable ? (
      <TouchableOpacity onPress={() => Linking.openURL(value)} style={styles.infoValueWrapper}>
        <Text style={[styles.infoValue, styles.infoLink]} numberOfLines={1}>
          {value}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text style={[styles.infoValue, styles.infoValueWrapper]} numberOfLines={2}>
        {value}
      </Text>
    )}
  </View>
);

const ItemDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProps>();
  const insets = useSafeAreaInsets();
  const { item, sharedTag } = route.params;
  const { isFavorite, toggleFavorite } = useFavorites();

  const imageUrl = item.images?.fixed_width?.url || item.images?.original?.url || '';
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView showsVerticalScrollIndicator={false} bounces>
        <Animated.Image
          sharedTransitionTag={sharedTag}
          sharedTransitionStyle={sharedTransition}
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <Animated.View entering={SlideInUp.delay(100).springify()} style={[styles.content, { paddingBottom: Spacing.xl + insets.bottom }]}>
          <View style={styles.titleRow}>
            <Animated.Text
              entering={FadeInDown.delay(150).springify()}
              style={[styles.title, styles.titleWrapper]}
            >
              {item.title || 'Untitled'}
            </Animated.Text>
            <FavoriteButton
              isFavorite={isFavorite(item.id)}
              onToggle={() => toggleFavorite(item)}
              size={28}
            />
          </View>

          <Animated.Text
            entering={FadeInDown.delay(200).springify()}
            style={styles.description}
          >
            {item.slug?.replace(/-/g, ' ') || 'No description available'}
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(250).springify()}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Details</Text>
            <InfoRow label="Type" value={item.type?.toUpperCase() || 'GIF'} />
            <InfoRow label="Slug" value={item.slug || '—'} />
            {item.url ? <InfoRow label="URL" value={item.url} pressable /> : null}
          </Animated.View>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: Colors.skeleton,
  },
  content: {
    padding: Spacing.lg,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  titleWrapper: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    lineHeight: 28,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    width: 70,
  },
  infoValueWrapper: {
    flex: 1,
    textAlign: 'right',
  },
  infoValue: {
    fontSize: 13,
    color: Colors.text,
    textAlign: 'right',
  },
  infoLink: {
    color: Colors.accent,
    textDecorationLine: 'underline',
  },
});

export default ItemDetailsScreen;
