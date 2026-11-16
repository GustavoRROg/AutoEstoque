import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '800', color: colors.primaryDark },
  subtitulo: { fontSize: 14, color: colors.text, marginTop: 2 },
  legenda: { fontSize: 13, color: colors.textMuted, marginTop: 2, marginBottom: 16 },
  botao: { marginTop: 12 },
  info: { marginTop: 16, alignItems: 'center' },
  infoTexto: { fontSize: 13, color: colors.textMuted },
});
