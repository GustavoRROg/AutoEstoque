import React from 'react';
import { View, Text, TextInput } from 'react-native';
import colors from '../../theme/colors';
import styles from './styles';

export default function Input({ label, erro, ...props }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, erro ? styles.inputErro : null]}
        placeholderTextColor={colors.secondary}
        {...props}
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
    </View>
  );
}
