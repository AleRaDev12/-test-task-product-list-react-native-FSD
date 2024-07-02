import {Platform, StyleSheet} from 'react-native';

export const colors = {
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F0F0F0',
  primary: '#007AFF',
  text: '#000000',
  secondaryText: '#6C6C6C',
  border: '#E5E5EA',
  error: '#FF3B30',
  white: '#FFFFFF',
};

export const typography = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 14,
    color: colors.text,
  },
  caption: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});

export const layout = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Android shadow properties
    elevation: 3,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
});
