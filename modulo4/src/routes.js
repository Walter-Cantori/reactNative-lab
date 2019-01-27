import { StackNavigator } from 'react-navigation';

import { colors } from './styles';
import Main from './pages/main';
import Search from './pages/search';
import Album from './pages/album';

const Routes = StackNavigator({
  Main: { screen: Main},
  Album: { screen: Album},
  Search: { screen: Search},
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.secundary,
      borderBottomWidth: 0,
    },
    headerTintColor: colors.white,
    headerBackTitle: null,
  },
});

export default Routes;
