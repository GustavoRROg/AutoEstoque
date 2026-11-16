import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import styles from './styles';

// Cartão de indicador usado no painel da tela inicial.
export default function StatCard({ icone, valor, legenda }) {
  return (
    <View style={styles.card}>
      <Ionicons name={icone} size={22} color={colors.accent} />
      <Text style={styles.valor}>{valor}</Text>
      <Text style={styles.legenda}>{legenda}</Text>
    </View>
  );
}
