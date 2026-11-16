import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useApp } from '../../context/AppContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { mostrarAlerta } from '../../utils/alerta';
import { mascararCPF, mascararTelefone, emailValido, cpfValido, somenteNumeros } from '../../utils/validacoes';
import styles from './styles';

const FORM_INICIAL = { nome: '', email: '', cpf: '', telefone: '' };

// Retorna a mensagem de erro do campo, ou '' se estiver válido.
function validarCampo(campo, valor) {
  switch (campo) {
    case 'nome':
      if (!valor.trim()) return 'O nome é obrigatório.';
      if (valor.trim().split(/\s+/).length < 2) return 'Informe nome e sobrenome.';
      return '';
    case 'email':
      if (!valor.trim()) return 'O e-mail é obrigatório.';
      return emailValido(valor) ? '' : 'E-mail inválido.';
    case 'cpf':
      if (!valor) return 'O CPF é obrigatório.';
      return cpfValido(valor) ? '' : 'CPF inválido.';
    case 'telefone':
      if (!valor) return 'O telefone é obrigatório.';
      return somenteNumeros(valor).length >= 10 ? '' : 'Informe DDD + número.';
    default:
      return '';
  }
}

export default function Cadastro({ navigation }) {
  const { usuarios, cadastrarUsuario } = useApp();
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [enviando, setEnviando] = useState(false);

  const { nome, email, cpf, telefone } = form;

  function alterar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    if (erros[campo]) setErros((atual) => ({ ...atual, [campo]: '' }));
  }

  const validarAoSair = (campo) => setErros((atual) => ({ ...atual, [campo]: validarCampo(campo, form[campo]) }));

  async function handleCadastrar() {
    const novosErros = Object.keys(form).reduce((acc, campo) => {
      const mensagem = validarCampo(campo, form[campo]);
      return mensagem ? { ...acc, [campo]: mensagem } : acc;
    }, {});
    setErros(novosErros);

    if (Object.keys(novosErros).length > 0) {
      mostrarAlerta('Verifique os campos', 'Corrija os campos destacados em vermelho.');
      return;
    }

    setEnviando(true);
    try {
      const usuario = await cadastrarUsuario({ nome: nome.trim(), email: email.trim().toLowerCase(), cpf, telefone });
      setForm(FORM_INICIAL);
      mostrarAlerta('Cadastro realizado!', `${usuario.nome} foi cadastrado(a) com sucesso.`);
      navigation.navigate('Dashboard');
    } catch (erro) {
      mostrarAlerta('Não foi possível cadastrar', erro.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>Novo usuário</Text>
        <Text style={styles.subtitulo}>Vendedores e gestores que operam o estoque.</Text>
        <Text style={styles.legenda}>Todos os campos com * são obrigatórios.</Text>

        <Input
          label="Nome completo"
          obrigatorio
          placeholder="Ex.: Maria da Silva"
          value={nome}
          onChangeText={(t) => alterar('nome', t)}
          onBlur={() => validarAoSair('nome')}
          erro={erros.nome}
        />
        <Input
          label="E-mail"
          obrigatorio
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => alterar('email', t)}
          onBlur={() => validarAoSair('email')}
          erro={erros.email}
        />
        <Input
          label="CPF"
          obrigatorio
          placeholder="000.000.000-00"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(t) => alterar('cpf', mascararCPF(t))}
          onBlur={() => validarAoSair('cpf')}
          erro={erros.cpf}
        />
        <Input
          label="Telefone"
          obrigatorio
          placeholder="(11) 98765-4321"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(t) => alterar('telefone', mascararTelefone(t))}
          onBlur={() => validarAoSair('telefone')}
          erro={erros.telefone}
        />

        <Button titulo="Cadastrar" onPress={handleCadastrar} carregando={enviando} estilo={styles.botao} />
        <Button titulo="Limpar" variante="secundario" onPress={() => { setForm(FORM_INICIAL); setErros({}); }} />

        <View style={styles.info}>
          <Text style={styles.infoTexto}>Usuários cadastrados: {usuarios.length}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
