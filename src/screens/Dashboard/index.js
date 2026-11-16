import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import { CATEGORIAS, STATUS } from '../../services/api';
import StatCard from '../../components/StatCard';
import Button from '../../components/Button';
import { formatarMoeda } from '../../utils';
import styles from './styles';

export default function Dashboard({ navigation }) {
  const { usuarios, veiculos } = useApp();

  const emEstoque = veiculos.filter((v) => v.status !== 'Vendido');
  let valorEstoque = 0;
  emEstoque.forEach((v) => {
    valorEstoque = valorEstoque + Number(v.preco);
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.linha}>
        <StatCard valor={veiculos.length} legenda="Veículos cadastrados" />
        <StatCard valor={emEstoque.length} legenda="Em estoque" />
        <StatCard valor={usuarios.length} legenda="Usuários" />
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Valor total em estoque</Text>
        <Text style={styles.destaque}>{formatarMoeda(valorEstoque)}</Text>
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Veículos por categoria</Text>
        {CATEGORIAS.map((categoria) => (
          <View key={categoria} style={styles.item}>
            <Text style={styles.itemTexto}>{categoria}</Text>
            <Text style={styles.itemValor}>{veiculos.filter((v) => v.categoria === categoria).length}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Veículos por status</Text>
        {STATUS.map((status) => (
          <View key={status} style={styles.item}>
            <Text style={styles.itemTexto}>{status}</Text>
            <Text style={styles.itemValor}>{veiculos.filter((v) => v.status === status).length}</Text>
          </View>
        ))}
      </View>

      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Usuários cadastrados</Text>
        {usuarios.length === 0 ? (
          <>
            <Text style={styles.vazio}>Nenhum usuário cadastrado ainda.</Text>
            <Button titulo="Cadastrar usuário" onPress={() => navigation.navigate('Cadastro')} />
          </>
        ) : (
          usuarios.map((usuario) => (
            <View key={usuario.id} style={styles.usuario}>
              <Text style={styles.itemTexto}>{usuario.nome}</Text>
              <Text style={styles.vazio}>{usuario.email}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
