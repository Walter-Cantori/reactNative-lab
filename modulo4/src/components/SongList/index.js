import React from 'react';

import { FlatList, View } from 'react-native';
import SongItem from '../SongItem/index';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

const SongList = ({ data, setSongRequest, ...props }) => (
  <FlatList
    { ...props }
    data={data}
    keyExtractor={song => String(song.id)}
    renderItem={({ item}) => <SongItem onPress={() => { setSongRequest(item, data)}}song={item} />}
  />
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(PlayerActions, dispatch);

export default connect(null, mapDispatchToProps)(SongList);