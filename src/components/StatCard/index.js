import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function StatCard({ valor, legenda }) {
  return (
    <View style={styles.card}>
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.legenda}>{legenda}</Text>
    </View>
  );
}
