import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useApp } from '../../context/AppContext';
import { CATEGORIAS, STATUS } from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import { mostrarAlerta } from '../../utils/alerta';
import { normalizarPlaca, placaValida, somenteNumeros } from '../../utils/validacoes';
import styles from './styles';

const FORM_INICIAL = {
  marca: '',
  modelo: '',
  ano: '',
  placa: '',
  km: '',
  preco: '',
  categoria: '',
  status: 'Disponível',
  responsavel: '',
};

const ANO_ATUAL = new Date().getFullYear();
const converterNumero = (valor) => Number(String(valor).replace(/\./g, '').replace(',', '.'));

function validar({ marca, modelo, ano, placa, km, preco, categoria, status, responsavel }) {
  const erros = {};
  if (!marca.trim()) erros.marca = 'Informe a marca.';
  if (!modelo.trim()) erros.modelo = 'Informe o modelo.';
  const anoNum = Number(ano);
  if (!ano) erros.ano = 'Informe o ano.';
  else if (anoNum < 1950 || anoNum > ANO_ATUAL + 1) erros.ano = `Ano entre 1950 e ${ANO_ATUAL + 1}.`;
  if (!placa) erros.placa = 'Informe a placa.';
  else if (!placaValida(placa)) erros.placa = 'Placa inválida (ex.: ABC1234 ou ABC1D23).';
  if (km && Number.isNaN(converterNumero(km))) erros.km = 'Quilometragem inválida.';
  const valor = converterNumero(preco);
  if (!String(preco).trim()) erros.preco = 'Informe o preço.';
  else if (Number.isNaN(valor) || valor <= 0) erros.preco = 'Informe um preço maior que zero.';
  if (!categoria) erros.categoria = 'Selecione a categoria.';
  if (!status) erros.status = 'Selecione o status.';
  if (!responsavel) erros.responsavel = 'Selecione o responsável.';
  return erros;
}

// Picker com rótulo e mensagem de erro, reutilizado nos três selects do formulário.
function Seletor({ label, valor, onChange, opcoes, erro, placeholder = true }) {
  return (
    <View style={styles.seletor}>
      <Text style={styles.label}>
        {label} <Text style={styles.asterisco}>*</Text>
      </Text>
      <View style={[styles.pickerBox, erro && styles.pickerErro]}>
        <Picker selectedValue={valor} onValueChange={onChange} style={styles.picker}>
          {placeholder && <Picker.Item label="Selecione..." value="" />}
          {opcoes.map((opcao) => (
            <Picker.Item key={opcao} label={opcao} value={opcao} />
          ))}
        </Picker>
      </View>
      {!!erro && <Text style={styles.erro}>{erro}</Text>}
    </View>
  );
}

export default function Lancamento({ navigation }) {
  const { usuarios, lancarVeiculo } = useApp();
  const [form, setForm] = useState(FORM_INICIAL);
  const [erros, setErros] = useState({});
  const [salvando, setSalvando] = useState(false);
  const { marca, modelo, ano, placa, km, preco, categoria, status, responsavel } = form;

  // Tratamento de erro: tela aberta sem nenhum usuário cadastrado.
  if (usuarios.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState icone="lock-closed-outline" titulo="Nenhum usuário cadastrado" mensagem="Cadastre um usuário para lançar veículos no estoque.">
          <Button titulo="Ir para o cadastro" onPress={() => navigation.navigate('Cadastro')} />
        </EmptyState>
      </View>
    );
  }

  function alterar(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: '' }));
  }

  async function handleSalvar() {
    const novosErros = validar(form);
    setErros(novosErros);
    if (Object.keys(novosErros).length) {
      mostrarAlerta('Verifique os campos', 'Corrija os campos destacados em vermelho.');
      return;
    }

    setSalvando(true);
    try {
      const veiculo = await lancarVeiculo({
        marca: marca.trim(),
        modelo: modelo.trim(),
        ano: Number(ano),
        placa: normalizarPlaca(placa),
        km: km ? converterNumero(km) : 0,
        preco: converterNumero(preco),
        categoria,
        status,
        responsavel,
      });
      setForm(FORM_INICIAL);
      mostrarAlerta('Veículo lançado!', `${veiculo.marca} ${veiculo.modelo} foi adicionado ao estoque.`);
      navigation.navigate('Listagem');
    } catch (erro) {
      mostrarAlerta('Não foi possível salvar', erro.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
      <Text style={styles.titulo}>Lançar veículo</Text>
      <Text style={styles.legenda}>O registro é enviado via POST para a API e aparece no estoque.</Text>

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Input label="Marca" obrigatorio placeholder="Ex.: Toyota" value={marca} onChangeText={(t) => alterar('marca', t)} erro={erros.marca} />
        </View>
        <View style={styles.coluna}>
          <Input label="Modelo" obrigatorio placeholder="Ex.: Corolla XEi" value={modelo} onChangeText={(t) => alterar('modelo', t)} erro={erros.modelo} />
        </View>
      </View>
      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Input
            label="Ano"
            obrigatorio
            placeholder={String(ANO_ATUAL)}
            keyboardType="numeric"
            value={ano}
            onChangeText={(t) => alterar('ano', somenteNumeros(t).slice(0, 4))}
            erro={erros.ano}
          />
        </View>
        <View style={styles.coluna}>
          <Input
            label="Placa"
            obrigatorio
            placeholder="ABC1D23"
            autoCapitalize="characters"
            value={placa}
            onChangeText={(t) => alterar('placa', normalizarPlaca(t))}
            erro={erros.placa}
          />
        </View>
      </View>
      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Input
            label="Quilometragem"
            placeholder="Ex.: 35000"
            keyboardType="numeric"
            value={km}
            onChangeText={(t) => alterar('km', somenteNumeros(t))}
            erro={erros.km}
          />
        </View>
        <View style={styles.coluna}>
          <Input
            label="Preço (R$)"
            obrigatorio
            placeholder="Ex.: 89900"
            keyboardType="decimal-pad"
            value={preco}
            onChangeText={(t) => alterar('preco', t.replace(/[^0-9,]/g, ''))}
            erro={erros.preco}
          />
        </View>
      </View>

      <View style={styles.linha}>
        <View style={styles.coluna}>
          <Seletor label="Categoria" valor={categoria} onChange={(v) => alterar('categoria', v)} opcoes={CATEGORIAS} erro={erros.categoria} />
        </View>
        <View style={styles.coluna}>
          <Seletor label="Status" valor={status} onChange={(v) => alterar('status', v)} opcoes={STATUS} erro={erros.status} placeholder={false} />
        </View>
      </View>
      <Seletor
        label="Responsável"
        valor={responsavel}
        onChange={(v) => alterar('responsavel', v)}
        opcoes={usuarios.map(({ nome }) => nome)}
        erro={erros.responsavel}
      />

      <Button titulo="Salvar veículo" onPress={handleSalvar} carregando={salvando} estilo={styles.botao} />
    </ScrollView>
  );
}
