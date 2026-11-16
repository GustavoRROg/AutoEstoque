import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from './src/context/AppContext';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { mostrarAlerta } from './src/utils/alerta';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer
        // Ação de navegação que nenhuma tela consegue tratar: avisa em vez de quebrar.
        onUnhandledAction={(acao) =>
          mostrarAlerta('Erro de navegação', `Não foi possível abrir "${acao.payload?.name ?? acao.type}".`)
        }
      >
        <StatusBar style="light" />
        <DrawerNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}
