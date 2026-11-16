import { Alert, Platform } from 'react-native';

// Alert.alert não funciona na versão web do Snack, então usamos window.alert lá.
export function mostrarAlerta(titulo, mensagem) {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensagem}`);
  } else {
    Alert.alert(titulo, mensagem);
  }
}
