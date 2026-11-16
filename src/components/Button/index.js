import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import colors from '../../theme/colors';
import styles from './styles';

// Botão reutilizável. variante: 'primario' | 'secundario' | 'destaque'
export default function Button({ titulo, onPress, variante = 'primario', carregando = false, desabilitado = false, estilo }) {
  const inativo = desabilitado || carregando;
  return (
    <TouchableOpacity
      style={[styles.base, styles[variante], inativo && styles.inativo, estilo]}
      onPress={onPress}
      disabled={inativo}
      activeOpacity={0.8}
    >
      {carregando ? (
        <ActivityIndicator color={variante === 'secundario' ? colors.primary : colors.white} />
      ) : (
        <Text style={[styles.texto, styles[`texto_${variante}`]]}>{titulo}</Text>
      )}
    </TouchableOpacity>
  );
}
