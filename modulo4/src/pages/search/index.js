import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { debounce } from 'lodash';

import styles from './styles';
import SongList from '../../components/SongList/index';
import { Creators as SearchActions } from '../../store/ducks/search';

class Search extends Component {
  static navigationOptions = {
    title: 'Buscar'
  };

  constructor(props){
    super(props)

    this.searchRequest = debounce(this.props.searchRequest, 500);
  }

  state = {
    searchInput: '',
  };

  search = (searchInput) => {
    this.searchRequest(searchInput);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <TextInput
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar por músicas..."
            placeholderTextColor="#666"
            underlineColorAndroid="transparent"
            value={this.state.searchInput}
            onChangeText={this.search}
          />
        </View>

        { this.props.search.loading 
          && <ActivityIndicator size="small" color="#999" style={styles.loading}/>
        }

        <SongList data={this.props.search.data} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(SearchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);