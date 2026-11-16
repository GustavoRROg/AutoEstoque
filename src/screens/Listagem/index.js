import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../../context/AppContext';
import { CATEGORIAS, STATUS } from '../../services/api';
import VehicleCard from '../../components/VehicleCard';
import EmptyState from '../../components/EmptyState';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../theme/colors';
import styles from './styles';

export default function Listagem() {
  const { veiculos, carregando, erro, carregarVeiculos } = useApp();
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [status, setStatus] = useState('Todos');

  const veiculosFiltrados = veiculos.filter((v) => {
    const texto = (v.marca + ' ' + v.modelo + ' ' + v.placa).toLowerCase();
    const passaBusca = texto.includes(busca.toLowerCase());
    const passaCategoria = categoria === 'Todas' || v.categoria === categoria;
    const passaStatus = status === 'Todos' || v.status === status;
    return passaBusca && passaCategoria && passaStatus;
  });

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Carregando estoque...</Text>
      </View>
    );
  }

  if (erro !== '') {
    return (
      <EmptyState titulo="Ops!" mensagem={erro}>
        <Button titulo="Tentar novamente" onPress={carregarVeiculos} />
      </EmptyState>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <Input label="Buscar" placeholder="Marca, modelo ou placa" value={busca} onChangeText={setBusca} />

        <View style={styles.linha}>
          <View style={styles.coluna}>
            <Text style={styles.label}>Categoria</Text>
            <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
              <Picker.Item label="Todas" value="Todas" />
              {CATEGORIAS.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>

          <View style={styles.coluna}>
            <Text style={styles.label}>Status</Text>
            <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
              <Picker.Item label="Todos" value="Todos" />
              {STATUS.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          </View>
        </View>

        <Text style={styles.contador}>
          {veiculosFiltrados.length} de {veiculos.length} veículos
        </Text>
      </View>

      <FlatList
        data={veiculosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VehicleCard veiculo={item} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<EmptyState titulo="Nenhum veículo encontrado" mensagem="Altere os filtros ou a busca." />}
      />
    </View>
  );
}
