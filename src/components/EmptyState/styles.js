import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';

export default StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 40, paddingHorizontal: 24 },
  titulo: { fontSize: 18, fontWeight: '700', color: colors.text, marginTop: 12, textAlign: 'center' },
  mensagem: { fontSize: 14, color: colors.textMuted, marginTop: 6, textAlign: 'center', marginBottom: 12 },
});
