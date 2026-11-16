import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 32 },
  indicadores: { flexDirection: 'row', marginHorizontal: -4, marginBottom: 8 },
  cartao: {
    marginTop: 6,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  cartaoTitulo: { fontSize: 16, fontWeight: '700', color: colors.primaryDark, marginBottom: 8 },
  destaque: { fontSize: 15, fontWeight: '700', color: colors.primary },
  vazio: { fontSize: 14, color: colors.textMuted, marginBottom: 8 },
  usuario: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  usuarioInfo: { marginLeft: 10, flex: 1 },
  usuarioNome: { fontSize: 15, fontWeight: '700', color: colors.text },
  usuarioDetalhe: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
