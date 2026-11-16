import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function EmptyState({ titulo, mensagem, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
      {children}
    </View>
  );
}
