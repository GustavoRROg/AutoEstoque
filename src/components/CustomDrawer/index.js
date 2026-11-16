import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { mostrarAlerta } from '../../utils/alerta';
import colors from '../../theme/colors';
import styles from './styles';

export default function CustomDrawer(props) {
  const { navigation, state, rotas } = props;
  const { usuarios, veiculos, origemDados } = useApp();
  const rotaAtual = state.routeNames[state.index];
  const ultimoUsuario = usuarios[usuarios.length - 1];

  const contadores = { Cadastro: usuarios.length, Listagem: veiculos.length };

  // Navegação com tratamento de erros: nunca deixa o app quebrar.
  function navegarPara({ nome, exigeUsuario }) {
    try {
      if (!state.routeNames.includes(nome)) {
        throw new Error(`A tela "${nome}" não existe.`);
      }
      if (exigeUsuario && usuarios.length === 0) {
        mostrarAlerta('Acesso restrito', 'Cadastre pelo menos um usuário antes de lançar veículos.');
        navigation.navigate('Cadastro');
        return;
      }
      navigation.navigate(nome);
    } catch (erro) {
      mostrarAlerta('Erro de navegação', erro.message);
    } finally {
      navigation.closeDrawer();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.cabecalho}>
        <View style={styles.logo}>
          <Ionicons name="car-sport" size={30} color={colors.primaryDark} />
        </View>
        <Text style={styles.titulo}>AutoEstoque</Text>
        <Text style={styles.subtitulo}>
          {ultimoUsuario ? `Último cadastro: ${ultimoUsuario.nome}` : 'Nenhum usuário cadastrado'}
        </Text>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.lista}>
        {rotas.map((rota) => {
          const { nome, titulo, icone, exigeUsuario } = rota;
          const ativo = rotaAtual === nome;
          const bloqueado = exigeUsuario && usuarios.length === 0;
          const contador = contadores[nome];
          return (
            <TouchableOpacity key={nome} style={[styles.item, ativo && styles.itemAtivo]} onPress={() => navegarPara(rota)}>
              <Ionicons name={icone} size={22} color={ativo ? colors.white : colors.primary} />
              <Text style={[styles.itemTexto, ativo && styles.itemTextoAtivo]}>{titulo}</Text>
              {contador > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeTexto}>{contador}</Text>
                </View>
              )}
              {bloqueado && <Ionicons name="lock-closed" size={16} color={colors.secondary} />}
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>

      <View style={styles.rodape}>
        <Ionicons name={origemDados === 'nuvem' ? 'cloud-done-outline' : 'phone-portrait-outline'} size={16} color={colors.textMuted} />
        <Text style={styles.origem}>Dados: {origemDados === 'nuvem' ? 'API na nuvem' : 'armazenamento local'}</Text>
      </View>
    </View>
  );
}
