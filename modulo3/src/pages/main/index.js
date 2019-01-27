import React, { Component } from 'react';
import { View, StatusBar, TextInput, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FavoriteActions from '../../store/actions/favorites';
import styles from './styles';

class Main extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    repoNameInput: '',
  }

  navigateToFavorites = () => {
    this.props.navigation.navigate('Favorites');
  }

  addRepository = () => {
    if (!this.state.repoNameInput.length) return;

    this.props.addFavoritesRequest(this.state.repoNameInput);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.content}>
          <Text style={styles.title}>Gitmark</Text>
          <Text style={styles.description}>
            Comece adicionando alguns repositórios aos seus favoritos
          </Text>

          <View style={styles.form}>
            { !!this.props.error && 
              <Text style={styles.error}>{this.props.error}</Text>
            }
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="usúario/repositório"
              underlineColorAndroid="transparent"
              value={this.state.repoNameInput}
              onChangeText={repoNameInput => this.setState({ repoNameInput })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={this.addRepository}
              activeOpacity={0.6}
            >
              { this.props.loading 
                ? <ActivityIndicator size="small" color={styles.loading.color}/>
                : <Text>Adicionar aos Favoritos</Text>
              }
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={this.navigateToFavorites}>
            <Text style={styles.footerLink}>Meus Favoritos ({this.props.favoritesCount})</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

const mapStateToProps = state => ({
  favoritesCount: state.favorites.data.length,
  error: state.favorites.errorOnAdd,
  loading: state.favorites.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
