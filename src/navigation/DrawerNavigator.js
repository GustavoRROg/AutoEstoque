import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Cadastro from '../screens/Cadastro';
import Listagem from '../screens/Listagem';
import Lancamento from '../screens/Lancamento';
import Dashboard from '../screens/Dashboard';
import colors from '../theme/colors';

const Drawer = createDrawerNavigator();

// Fonte única das rotas: usada pelo navigator e pelo menu customizado.
export const ROTAS = [
  { nome: 'Cadastro', titulo: 'Cadastro de Usuários', icone: 'person-add-outline', componente: Cadastro },
  { nome: 'Listagem', titulo: 'Estoque de Veículos', icone: 'list-outline', componente: Listagem },
  { nome: 'Lancamento', titulo: 'Lançar Veículo', icone: 'add-circle-outline', componente: Lancamento, exigeUsuario: true },
  { nome: 'Dashboard', titulo: 'Dashboard', icone: 'stats-chart-outline', componente: Dashboard },
];

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Cadastro"
      drawerContent={(props) => <CustomDrawer {...props} rotas={ROTAS} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
        drawerStyle: { backgroundColor: colors.background, width: 290 },
      }}
    >
      {ROTAS.map(({ nome, titulo, componente }) => (
        <Drawer.Screen key={nome} name={nome} component={componente} options={{ title: titulo }} />
      ))}
    </Drawer.Navigator>
  );
}
