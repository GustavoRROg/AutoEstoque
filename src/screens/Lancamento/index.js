import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../../context/AppContext';
import { CATEGORIAS, STATUS } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { mostrarAlerta } from '../../utils';
import styles from './styles';

export default function Lancamento({ navigation }) {
  const { usuarios, veiculos, lancarVeiculo } = useApp();
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [placa, setPlaca] = useState('');
  const [km, setKm] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('Disponível');
  const [responsavel, setResponsavel] = useState('');
  const [erros, setErros] = useState({});

  if (usuarios.length === 0) {
    return (
      <EmptyState titulo="Nenhum usuário cadastrado" mensagem="Cadastre um usuário para lançar veículos.">
        <Button titulo="Ir para o cadastro" onPress={() => navigation.navigate('Cadastro')} />
      </EmptyState>
    );
  }

  function validar() {
    const novosErros = {};
    if (marca.trim() === '') novosErros.marca = 'Informe a marca.';
    if (modelo.trim() === '') novosErros.modelo = 'Informe o modelo.';
    if (ano.length !== 4) novosErros.ano = 'Informe o ano com 4 números.';
    if (placa.length !== 7) {
      novosErros.placa = 'A placa deve ter 7 caracteres.';
    } else if (veiculos.some((v) => v.placa === placa)) {
      novosErros.placa = 'Esta placa já está no estoque.';
    }
    if (preco === '' || Number(preco) <= 0) novosErros.preco = 'Informe um preço válido.';
    if (categoria === '') novosErros.categoria = 'Selecione a categoria.';
    if (responsavel === '') novosErros.responsavel = 'Selecione o responsável.';
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function limpar() {
    setMarca('');
    setModelo('');
    setAno('');
    setPlaca('');
    setKm('');
    setPreco('');
    setCategoria('');
    setStatus('Disponível');
    setResponsavel('');
    setErros({});
  }

  async function salvar() {
    if (!validar()) {
      mostrarAlerta('Atenção', 'Preencha os campos corretamente.');
      return;
    }
    try {
      await lancarVeiculo({
        marca,
        modelo,
        ano: Number(ano),
        placa,
        km: Number(km),
        preco: Number(preco),
        categoria,
        status,
        responsavel,
      });
      mostrarAlerta('Sucesso', 'Veículo lançado no estoque!');
      limpar();
      navigation.navigate('Listagem');
    } catch (erro) {
      mostrarAlerta('Erro', 'Não foi possível salvar o veículo.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Lançar veículo</Text>

      <Input label="Marca" placeholder="Ex.: Toyota" value={marca} onChangeText={setMarca} erro={erros.marca} />
      <Input label="Modelo" placeholder="Ex.: Corolla" value={modelo} onChangeText={setModelo} erro={erros.modelo} />
      <Input
        label="Ano"
        placeholder="Ex.: 2023"
        keyboardType="numeric"
        maxLength={4}
        value={ano}
        onChangeText={(texto) => setAno(texto.replace(/[^0-9]/g, ''))}
        erro={erros.ano}
      />
      <Input
        label="Placa"
        placeholder="Ex.: ABC1D23"
        autoCapitalize="characters"
        maxLength={7}
        value={placa}
        onChangeText={(texto) => setPlaca(texto.toUpperCase())}
        erro={erros.placa}
      />
      <Input
        label="Quilometragem"
        placeholder="Ex.: 35000"
        keyboardType="numeric"
        value={km}
        onChangeText={(texto) => setKm(texto.replace(/[^0-9]/g, ''))}
      />
      <Input
        label="Preço (R$)"
        placeholder="Ex.: 89900"
        keyboardType="numeric"
        value={preco}
        onChangeText={(texto) => setPreco(texto.replace(/[^0-9]/g, ''))}
        erro={erros.preco}
      />

      <Text style={styles.label}>Categoria</Text>
      <Picker selectedValue={categoria} onValueChange={setCategoria} style={styles.picker}>
        <Picker.Item label="Selecione..." value="" />
        {CATEGORIAS.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
      {erros.categoria ? <Text style={styles.erro}>{erros.categoria}</Text> : null}

      <Text style={styles.label}>Status</Text>
      <Picker selectedValue={status} onValueChange={setStatus} style={styles.picker}>
        {STATUS.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>

      <Text style={styles.label}>Responsável</Text>
      <Picker selectedValue={responsavel} onValueChange={setResponsavel} style={styles.picker}>
        <Picker.Item label="Selecione..." value="" />
        {usuarios.map((usuario) => (
          <Picker.Item key={usuario.id} label={usuario.nome} value={usuario.nome} />
        ))}
      </Picker>
      {erros.responsavel ? <Text style={styles.erro}>{erros.responsavel}</Text> : null}

      <View style={styles.botoes}>
        <Button titulo="Salvar veículo" onPress={salvar} />
      </View>
    </ScrollView>
  );
}
