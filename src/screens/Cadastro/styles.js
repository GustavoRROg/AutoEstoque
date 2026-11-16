import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  conteudo: { padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: colors.primaryDark },
  legenda: { fontSize: 13, color: colors.textMuted, marginBottom: 16 },
  info: { marginTop: 16, textAlign: 'center', color: colors.textMuted },
});
