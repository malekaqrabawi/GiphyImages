import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Typography = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.3,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text,
    lineHeight: 20,
  },
  bodySecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
