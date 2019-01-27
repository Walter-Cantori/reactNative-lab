import React from 'react';
import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SongItem = ({ song, player, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.info}>
      <Text style={[styles.title, (player.currentSong.id === song.id) ? styles.active: {}  ]}>{song.title}</Text>
      <Text style={styles.author}>{song.author}</Text>
    </View>
    { (player.loadingId === song.id)
      ? <ActivityIndicator size="small" color="#999" style={styles.loading} />
      : <Icon name="play-circle-outline" size={24} style={styles.play} />
    }
  </TouchableOpacity>
)


const mapStateToProps = state => ({
  player: state.player,
});

export default connect(mapStateToProps)(SongItem);
