import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// Barra horizontal simples para o gráfico do Dashboard (sem bibliotecas externas).
export default function BarraCategoria({ rotulo, quantidade, maximo }) {
  const largura = maximo > 0 ? `${(quantidade / maximo) * 100}%` : '0%';
  return (
    <View style={styles.linha}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <View style={styles.trilho}>
        <View style={[styles.barra, { width: largura }]} />
      </View>
      <Text style={styles.valor}>{quantidade}</Text>
    </View>
  );
}
