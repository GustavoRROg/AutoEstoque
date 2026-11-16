import React from 'react';
import { View, Text, TextInput } from 'react-native';
import colors from '../../theme/colors';
import styles from './styles';

// Campo de texto reutilizável com rótulo, indicação de obrigatório e mensagem de erro.
export default function Input({ label, obrigatorio = false, erro, ...propsDoTextInput }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {obrigatorio && <Text style={styles.asterisco}> *</Text>}
      </Text>
      <TextInput
        style={[styles.input, erro && styles.inputErro]}
        placeholderTextColor={colors.textMuted}
        {...propsDoTextInput}
      />
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}
