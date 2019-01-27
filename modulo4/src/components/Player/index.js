import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as PlayerActions } from '../../store/ducks/player';

import styles from './styles';

currentSong = {
  title: 'foo',
  author: 'bar',
};

const Player = ({ player, play, pause, next, previous }) => {
  if (player.currentSong.id === undefined) return null;

  const pressFunction = player.paused ? play : pause
  const icon = player.paused ? 'play-circle-filled' : 'pause-circle-filled'

  return (
    <View style={styles.container}>

      <View style={styles.currentSong}>
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.author}>{currentSong.author}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity onPress={previous}>
          <Icon name="skip-previous" size={24} style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.play} onPress={pressFunction}>
          <Icon name={icon}size={36} style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={next}>
          <Icon name="skip-next" size={24} style={styles.controlIcon} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const mapStateToProps = state => ({
  player: state.player,
});

const mapDispatchToProps = dispatch => 
  bindActionCreators(PlayerActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);