import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import createNavigator from './routes';
import './config/reactotronConfig';

export default class App extends Component {
  state = {
    isUserChecked: false,
    isUserLogged: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username')
    this.appLoaded(username);
  }

  appLoaded(username){
    this.setState({
      isUserChecked: true,
      isUserLogged: !!username
    })
  }

  render(){
    if(!this.state.isUserChecked) return null;

    const Routes = createNavigator(this.state.isUserLogged);
    return(
      <Routes />
    )
  }
}
