import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { CATEGORIAS, STATUS } from '../../services/api';
import StatCard from '../../components/StatCard';
import BarraCategoria from '../../components/BarraCategoria';
import Button from '../../components/Button';
import { formatarMoeda, formatarMoedaCompacta } from '../../utils/formatadores';
import colors from '../../theme/colors';
import styles from './styles';

const contarPor = (lista, campo, valores) =>
  valores.map((valor) => ({ valor, quantidade: lista.filter((item) => item[campo] === valor).length }));

export default function Dashboard({ navigation }) {
  const { usuarios, veiculos } = useApp();

  // Indicadores calculados a partir do estado global.
  const emEstoque = veiculos.filter(({ status }) => status !== 'Vendido');
  const valorEstoque = emEstoque.reduce((soma, { preco }) => soma + Number(preco), 0);
  const valorVendido = veiculos
    .filter(({ status }) => status === 'Vendido')
    .reduce((soma, { preco }) => soma + Number(preco), 0);
  const porCategoria = contarPor(veiculos, 'categoria', CATEGORIAS);
  const porStatus = contarPor(veiculos, 'status', STATUS);
  const maxCategoria = Math.max(0, ...porCategoria.map(({ quantidade }) => quantidade));
  const maxStatus = Math.max(0, ...porStatus.map(({ quantidade }) => quantidade));
  const maisCaro = emEstoque.reduce((maior, v) => (!maior || Number(v.preco) > Number(maior.preco) ? v : maior), null);
  const ultimosUsuarios = [...usuarios].reverse().slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.indicadores}>
        <StatCard icone="car-sport" valor={veiculos.length} legenda="Veículos cadastrados" />
        <StatCard icone="checkmark-circle" valor={emEstoque.length} legenda="Em estoque" />
        <StatCard icone="cash" valor={formatarMoedaCompacta(valorEstoque)} legenda="Valor em estoque" />
      </View>
      <View style={styles.indicadores}>
        <StatCard icone="pricetags" valor={formatarMoedaCompacta(valorVendido)} legenda="Total vendido" />
        <StatCard icone="people" valor={usuarios.length} legenda="Usuários" />
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Veículos por categoria</Text>
        {porCategoria.map(({ valor, quantidade }) => (
          <BarraCategoria key={valor} rotulo={valor} quantidade={quantidade} maximo={maxCategoria} />
        ))}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Veículos por status</Text>
        {porStatus.map(({ valor, quantidade }) => (
          <BarraCategoria key={valor} rotulo={valor} quantidade={quantidade} maximo={maxStatus} />
        ))}
      </View>

      {maisCaro && (
        <View style={styles.cartao}>
          <Text style={styles.cartaoTitulo}>Veículo mais valioso em estoque</Text>
          <Text style={styles.destaque}>
            {maisCaro.marca} {maisCaro.modelo} {maisCaro.ano} · {formatarMoeda(maisCaro.preco)}
          </Text>
        </View>
      )}

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Últimos usuários cadastrados</Text>
        {ultimosUsuarios.length === 0 ? (
          <>
            <Text style={styles.vazio}>Nenhum usuário cadastrado ainda.</Text>
            <Button titulo="Cadastrar usuário" variante="destaque" onPress={() => navigation.navigate('Cadastro')} />
          </>
        ) : (
          ultimosUsuarios.map(({ id, nome, email, telefone }) => (
            <View key={id} style={styles.usuario}>
              <Ionicons name="person-circle" size={36} color={colors.secondary} />
              <View style={styles.usuarioInfo}>
                <Text style={styles.usuarioNome}>{nome}</Text>
                <Text style={styles.usuarioDetalhe}>
                  {email} · {telefone}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
