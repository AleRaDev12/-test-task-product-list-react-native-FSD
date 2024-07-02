import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {typography, colors} from '../styles/common';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => (
  <View style={styles.container}>
    <View style={styles.messageContainer}>
      <Text style={[typography.body, styles.text]}>{message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
  },
  messageContainer: {
    padding: 16,
    backgroundColor: colors.error,
    borderRadius: 8,
    margin: 16,
  },
  text: {
    color: colors.white,
    textAlign: 'center',
  },
});
