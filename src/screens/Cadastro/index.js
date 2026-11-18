import React, { useState } from 'react';
import { Text, ScrollView } from 'react-native';
import { useApp } from '../../context/AppContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { mostrarAlerta } from '../../utils';
import styles from './styles';

export default function Cadastro({ navigation }) {
  const { usuarios, cadastrarUsuario } = useApp();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};
    if (nome.trim() === '') novosErros.nome = 'O nome é obrigatório.';
    if (email.trim() === '') {
      novosErros.email = 'O e-mail é obrigatório.';
    } else if (!email.includes('@') || !email.includes('.')) {
      novosErros.email = 'E-mail inválido.';
    }
    if (cpf === '') {
      novosErros.cpf = 'O CPF é obrigatório.';
    } else if (cpf.length !== 11 || isNaN(cpf)) {
      novosErros.cpf = 'O CPF deve ter 11 números.';
    } else if (usuarios.some((u) => u.cpf === cpf)) {
      novosErros.cpf = 'Este CPF já está cadastrado.';
    }
    if (telefone === '') {
      novosErros.telefone = 'O telefone é obrigatório.';
    } else if (telefone.length < 10 || isNaN(telefone)) {
      novosErros.telefone = 'Informe o DDD e o número, somente números.';
    }
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function limpar() {
    setNome('');
    setEmail('');
    setCpf('');
    setTelefone('');
    setErros({});
  }

  async function cadastrar() {
    if (!validar()) {
      mostrarAlerta('Atenção', 'Preencha os campos corretamente.');
      return;
    }
    try {
      await cadastrarUsuario({ nome, email, cpf, telefone });
      mostrarAlerta('Sucesso', 'Usuário cadastrado!');
      limpar();
      navigation.navigate('Dashboard');
    } catch (erro) {
      mostrarAlerta('Erro', 'Não foi possível cadastrar o usuário.');
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Novo usuário</Text>
      <Text style={styles.legenda}>Todos os campos são obrigatórios.</Text>

      <Input label="Nome completo" placeholder="Ex.: Maria da Silva" value={nome} onChangeText={setNome} erro={erros.nome} />
      <Input
        label="E-mail"
        placeholder="seuemail@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        erro={erros.email}
      />
      <Input
        label="CPF (somente números)"
        placeholder="00000000000"
        keyboardType="numeric"
        maxLength={11}
        value={cpf}
        onChangeText={setCpf}
        erro={erros.cpf}
      />
      <Input
        label="Telefone com DDD (somente números)"
        placeholder="11987654321"
        keyboardType="phone-pad"
        maxLength={11}
        value={telefone}
        onChangeText={setTelefone}
        erro={erros.telefone}
      />

      <Button titulo="Cadastrar" onPress={cadastrar} />
      <Button titulo="Limpar" secundario onPress={limpar} />

      <Text style={styles.info}>Usuários cadastrados: {usuarios.length}</Text>
    </ScrollView>
  );
}
