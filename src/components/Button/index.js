import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './styles';

export default function Button({ titulo, onPress, secundario }) {
  return (
    <TouchableOpacity style={secundario ? styles.secundario : styles.primario} onPress={onPress}>
      <Text style={secundario ? styles.textoSecundario : styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}
