import { Alert } from 'react-native';

export function mostrarAlerta(titulo, mensagem) {
  Alert.alert(titulo, mensagem);
}

export function formatarMoeda(valor) {
  return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
}
