import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  linha: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  rotulo: { width: 120, fontSize: 13, color: colors.text },
  trilho: { flex: 1, height: 14, backgroundColor: colors.border, borderRadius: 7, overflow: 'hidden' },
  barra: { height: '100%', backgroundColor: colors.primary, borderRadius: 7 },
  valor: { width: 28, textAlign: 'right', fontSize: 13, fontWeight: '700', color: colors.primaryDark },
});
