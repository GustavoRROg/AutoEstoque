import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatarMoeda } from '../../utils';
import colors from '../../theme/colors';
import styles from './styles';

export default function VehicleCard({ veiculo }) {
  const { marca, modelo, ano, placa, km, preco, categoria, status } = veiculo;

  let corStatus = colors.success;
  if (status === 'Reservado') corStatus = colors.warning;
  if (status === 'Vendido') corStatus = colors.sold;

  return (
    <View style={styles.card}>
      <Ionicons name="car-sport-outline" size={32} color={colors.primary} />
      <View style={styles.info}>
        <Text style={styles.nome}>
          {marca} {modelo}
        </Text>
        <Text style={styles.detalhes}>
          {ano} · {km} km · {placa}
        </Text>
        <Text style={styles.categoria}>{categoria}</Text>
      </View>
      <View style={styles.direita}>
        <Text style={styles.preco}>{formatarMoeda(preco)}</Text>
        <Text style={[styles.status, { backgroundColor: corStatus }]}>{status}</Text>
      </View>
    </View>
  );
}
