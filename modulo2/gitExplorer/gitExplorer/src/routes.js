import React from 'react';
import { StackNavigator, TabNavigator} from 'react-navigation';

import Welcome from './pages/welcome'
import Repositories from './pages/repositories'
import Organizations from './pages/organizations'
import HeaderRight from './components/HeaderRight'
import { metrics, colors } from './styles'

const createNavigator = (isLogged = false) => 
  StackNavigator({
    Welcome: { screen: Welcome },
    User: {
      screen: TabNavigator({
        Repositories: { screen: Repositories },
        Organizations: { screen: Organizations },
      }, {
        tabBarPosition: 'bottom',
        tabBarOptions: {
          showIcon: true,
          showLabel: false,
          activeTintColor: colors.white,
          inactivateTintColor: colors.whiteTransparent,
          style: {
            backgroundColor: colors.secundary,
          }
        }
      }),
    },
  }, {
    initialRouteName: isLogged ? 'User' : 'Welcome',
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
          paddingHorizontal: metrics.basePadding
        },
        headerRight: <HeaderRight navigation={navigation}/>
    })
  });

export default createNavigator;