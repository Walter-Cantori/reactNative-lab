import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  empty: {
    alignSelf: 'center',
    color: colors.white,
    marginTop: 20,
    fontSize: 14,
  },
});

export default styles;
