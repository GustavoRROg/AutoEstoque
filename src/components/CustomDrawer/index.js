import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useApp } from '../../context/AppContext';
import { mostrarAlerta } from '../../utils';
import styles from './styles';

const ITENS = [
  { rota: 'Cadastro', titulo: 'Cadastro de Usuários' },
  { rota: 'Listagem', titulo: 'Estoque de Veículos' },
  { rota: 'Lancamento', titulo: 'Lançar Veículo' },
  { rota: 'Dashboard', titulo: 'Dashboard' },
];

export default function CustomDrawer(props) {
  const { navigation, state } = props;
  const { usuarios, veiculos } = useApp();
  const rotaAtual = state.routeNames[state.index];

  function navegar(rota) {
    try {
      if (rota === 'Lancamento' && usuarios.length === 0) {
        mostrarAlerta('Atenção', 'Cadastre um usuário antes de lançar veículos.');
        navigation.navigate('Cadastro');
      } else {
        navigation.navigate(rota);
      }
    } catch (erro) {
      mostrarAlerta('Erro', 'Não foi possível abrir a tela.');
    }
    navigation.closeDrawer();
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>AutoEstoque</Text>
        <Text style={styles.subtitulo}>
          {usuarios.length} usuários · {veiculos.length} veículos
        </Text>
      </View>

      <DrawerContentScrollView {...props}>
        {ITENS.map((item) => {
          const ativo = rotaAtual === item.rota;
          return (
            <TouchableOpacity
              key={item.rota}
              style={[styles.item, ativo && styles.itemAtivo]}
              onPress={() => navegar(item.rota)}
            >
              <Text style={[styles.itemTexto, ativo && styles.itemTextoAtivo]}>{item.titulo}</Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
}
