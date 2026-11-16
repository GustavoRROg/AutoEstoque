import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/colors';
import { formatarMoeda, formatarKm, formatarPlaca } from '../../utils/formatadores';
import styles from './styles';

export const ICONES_CATEGORIA = {
  Hatch: 'car-outline',
  Sedan: 'car',
  SUV: 'car-sport',
  Picape: 'car-sport-outline',
  'Utilitário': 'bus-outline',
};

export const CORES_STATUS = {
  'Disponível': colors.success,
  Reservado: colors.warning,
  Vendido: colors.sold,
};

// Comunicação direta: a tela pai envia "veiculo" por props, desestruturado aqui.
export default function VehicleCard({ veiculo }) {
  const { marca, modelo, ano, placa, km, preco, categoria, status, responsavel } = veiculo;
  const corStatus = CORES_STATUS[status] || colors.secondary;
  return (
    <View style={styles.card}>
      <View style={styles.icone}>
        <Ionicons name={ICONES_CATEGORIA[categoria] || 'car'} size={26} color={colors.primary} />
      </View>
      <View style={styles.info}>
        <Text style={styles.nome}>
          {marca} {modelo}
        </Text>
        <Text style={styles.detalhes}>
          {ano} · {formatarKm(km)} · {formatarPlaca(placa)}
        </Text>
        <Text style={styles.categoria}>
          {categoria}
          {responsavel ? ` · por ${responsavel}` : ''}
        </Text>
      </View>
      <View style={styles.direita}>
        <Text style={styles.preco}>{formatarMoeda(preco)}</Text>
        <View style={[styles.status, { backgroundColor: corStatus }]}>
          <Text style={styles.statusTexto}>{status}</Text>
        </View>
      </View>
    </View>
  );
}
