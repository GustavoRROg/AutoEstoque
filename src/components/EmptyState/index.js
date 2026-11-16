import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import styles from './styles';

// Mensagem exibida quando uma lista está vazia.
export default function EmptyState({ icone = 'car-outline', titulo, mensagem, children }) {
  return (
    <View style={styles.container}>
      <Ionicons name={icone} size={56} color={colors.secondary} />
      <Text style={styles.titulo}>{titulo}</Text>
      {!!mensagem && <Text style={styles.mensagem}>{mensagem}</Text>}
      {children}
    </View>
  );
}
