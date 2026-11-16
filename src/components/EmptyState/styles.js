import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { alignItems: 'center', padding: 32 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: colors.text, textAlign: 'center' },
  mensagem: { fontSize: 14, color: colors.textMuted, marginTop: 6, marginBottom: 12, textAlign: 'center' },
});
