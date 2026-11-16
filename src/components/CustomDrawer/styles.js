import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cabecalho: { backgroundColor: colors.primaryDark, paddingTop: 48, paddingBottom: 20, paddingHorizontal: 20 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: colors.white, marginTop: 8 },
  subtitulo: { fontSize: 13, color: colors.border, marginTop: 2 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 10,
  },
  itemAtivo: { backgroundColor: colors.primary },
  itemTexto: { marginLeft: 14, fontSize: 15, color: colors.text },
  itemTextoAtivo: { color: colors.white, fontWeight: 'bold' },
});
