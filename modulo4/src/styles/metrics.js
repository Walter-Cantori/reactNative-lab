import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default {
  basePadding: 20,
  baseMarging: 15,
  baseRadius: 3,
  screenWidth: width < height ? width : height,
  screenheight: width < height ? height : width,
};
