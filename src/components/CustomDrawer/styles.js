import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  cabecalho: { backgroundColor: colors.primaryDark, paddingTop: 48, paddingBottom: 20, paddingHorizontal: 20 },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  titulo: { fontSize: 20, fontWeight: '800', color: colors.white },
  subtitulo: { fontSize: 13, color: colors.textOnDark, marginTop: 2 },
  lista: { paddingTop: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 10,
  },
  itemAtivo: { backgroundColor: colors.primary },
  itemTexto: { flex: 1, marginLeft: 14, fontSize: 15, fontWeight: '600', color: colors.text },
  itemTextoAtivo: { color: colors.white },
  badge: {
    backgroundColor: colors.accent,
    borderRadius: 11,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTexto: { fontSize: 12, fontWeight: '800', color: colors.primaryDark },
  rodape: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, padding: 16 },
  origem: { fontSize: 12, color: colors.textMuted, marginLeft: 6 },
});
