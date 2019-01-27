import React from 'react';

import { View, Text, FlatList, ImageBackground } from 'react-native';
import styles from './styles';
import SongList from '../../components/SongList/index';

const Album = ({ navigation }) => {
  const { album } = navigation.state.params;

  return (
    <View style={styles.container}>

      <ImageBackground 
        style={styles.thumbnail}
        source={{ uri: album.thumbnail }}
        blurRadius={5}
      >
        <View style={styles.thumbnailContainer}>
          <Text style={styles.title}>{album.title}</Text>
          <Text style={styles.author}>{album.author}</Text>
        </View>
      </ImageBackground>

      <SongList data={album.songs} />
    </View>
  );
};

Album.navigationOptions = ({ navigation }) => ({
  title: navigation.state.params.album.title,
})

export default Album;