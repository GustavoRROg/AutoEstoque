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

const ORDENACOES = {
  recentes: (a, b) => Number(b.ano) - Number(a.ano),
  menorPreco: (a, b) => Number(a.preco) - Number(b.preco),
  maiorPreco: (a, b) => Number(b.preco) - Number(a.preco),
  menorKm: (a, b) => Number(a.km) - Number(b.km),
};

// Picker reutilizado nos três filtros da tela.
function Filtro({ label, valor, onChange, opcoes }) {
  return (
    <View style={styles.filtro}>
      <Text style={styles.filtroLabel}>{label}</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={valor} onValueChange={onChange} style={styles.picker}>
          {opcoes.map(({ label: rotulo, value }) => (
            <Picker.Item key={value} label={rotulo} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const paraOpcoes = (lista) => [{ label: 'Todos', value: 'Todos' }, ...lista.map((item) => ({ label: item, value: item }))];

export default function Listagem() {
  const { veiculos, carregando, erro, carregarDados } = useApp();
  const [categoria, setCategoria] = useState('Todos');
  const [status, setStatus] = useState('Todos');
  const [ordem, setOrdem] = useState('recentes');
  const [busca, setBusca] = useState('');

  // Filtros combinados: busca (marca/modelo/placa) + categoria + status + ordenação.
  const termo = busca.trim().toLowerCase();
  const veiculosFiltrados = veiculos
    .filter((v) => categoria === 'Todos' || v.categoria === categoria)
    .filter((v) => status === 'Todos' || v.status === status)
    .filter(({ marca, modelo, placa }) => `${marca} ${modelo} ${placa}`.toLowerCase().includes(termo))
    .sort(ORDENACOES[ordem]);

  if (carregando && veiculos.length === 0) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.carregando}>Carregando estoque...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <EmptyState icone="cloud-offline-outline" titulo="Ops!" mensagem={erro}>
        <Button titulo="Tentar novamente" onPress={carregarDados} />
      </EmptyState>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtros}>
        <Input label="Buscar" placeholder="Marca, modelo ou placa" value={busca} onChangeText={setBusca} autoCapitalize="none" />
        <View style={styles.linha}>
          <Filtro label="Categoria" valor={categoria} onChange={setCategoria} opcoes={paraOpcoes(CATEGORIAS)} />
          <Filtro label="Status" valor={status} onChange={setStatus} opcoes={paraOpcoes(STATUS)} />
        </View>
        <View style={styles.linha}>
          <Filtro
            label="Ordenar por"
            valor={ordem}
            onChange={setOrdem}
            opcoes={[
              { label: 'Mais novos', value: 'recentes' },
              { label: 'Menor preço', value: 'menorPreco' },
              { label: 'Maior preço', value: 'maiorPreco' },
              { label: 'Menor quilometragem', value: 'menorKm' },
            ]}
          />
        </View>
      </View>

      <Text style={styles.contador}>
        {veiculosFiltrados.length} de {veiculos.length} veículos
      </Text>

      <FlatList
        data={veiculosFiltrados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VehicleCard veiculo={item} />}
        contentContainerStyle={styles.lista}
        refreshing={carregando}
        onRefresh={carregarDados}
        ListEmptyComponent={<EmptyState titulo="Nenhum veículo encontrado" mensagem="Altere os filtros ou a busca." />}
      />
    </View>
  );
}
