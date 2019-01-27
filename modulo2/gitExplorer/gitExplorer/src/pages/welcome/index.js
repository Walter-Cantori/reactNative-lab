import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import PropTypes from 'prop-types';
import api from '../../services/api';

export default class Welcome extends Component{
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    errorMessage: '',
  };

  signIn = async () => {
    const { username } = this.state;

    if(username.length === 0) return;

    this.setState({ loading: true });

    try {
      await this.checkUserExists(username);

      await this.saveUser(username)

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'User' })
        ]
      })
  
      this.props.navigation.dispatch(resetAction)

    } catch(err){
      console.tron.log(err)
      this.setState({
        loading: false,
        errorMessage: "Usuário não encontrado",
      });
    }
  }

  checkUserExists = async (username) =>{
    const user = await api.get(`/users/${username}`);
    return user;
  }

  saveUser = async(username) => {
    AsyncStorage.setItem('@Githuber:username', username);
  }

  render() {
    return (
      <View style={styles.container}>
    
        <StatusBar barStyle='light-content' />
    
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>
          Para continuar. precisamos que você informe seu usuário e clique em Prosseguir
        </Text>
    
        { !!this.state.errorMessage 
          && <Text style={styles.error}>{ this.state.errorMessage }</Text> 

        }

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={ this.state.username }
            onChangeText={username => this.setState({ username })}
          />
        </View>
    
        <TouchableOpacity style={styles.button} onPress={ this.signIn }>
          {this.state.loading 
            ? <ActivityIndicator color="#FFF" size="small" />
            : <Text style={styles.buttonText}>Prosseguir</Text>
          }
        </TouchableOpacity>
      </View>
    )
  }
};