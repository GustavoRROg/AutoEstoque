import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  carregando: { marginTop: 10, color: colors.textMuted },
  filtros: { paddingHorizontal: 16, paddingTop: 12 },
  linha: { flexDirection: 'row', marginHorizontal: -4, marginBottom: 10 },
  filtro: { flex: 1, marginHorizontal: 4 },
  filtroLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 6 },
  pickerBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: { color: colors.text, borderWidth: 0, height: 48, paddingHorizontal: 8, backgroundColor: colors.surface },
  contador: { paddingHorizontal: 16, paddingBottom: 8, color: colors.textMuted, fontSize: 13 },
  lista: { paddingHorizontal: 16, paddingBottom: 24, flexGrow: 1 },
});
