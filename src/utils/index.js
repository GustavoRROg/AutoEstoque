import { Alert, Platform } from 'react-native';

export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(titulo + '\n\n' + mensagem);
  } else {
    Alert.alert(titulo, mensagem);
  }
}

export function formatarMoeda(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
