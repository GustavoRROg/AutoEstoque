import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import Cadastro from '../screens/Cadastro';
import Listagem from '../screens/Listagem';
import Lancamento from '../screens/Lancamento';
import Dashboard from '../screens/Dashboard';
import colors from '../theme/colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Cadastro"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
      }}
    >
      <Drawer.Screen name="Cadastro" component={Cadastro} options={{ title: 'Cadastro de Usuários' }} />
      <Drawer.Screen name="Listagem" component={Listagem} options={{ title: 'Estoque de Veículos' }} />
      <Drawer.Screen name="Lancamento" component={Lancamento} options={{ title: 'Lançar Veículo' }} />
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
    </Drawer.Navigator>
  );
}
