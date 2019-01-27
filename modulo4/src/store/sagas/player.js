import { call, put, select  } from 'redux-saga/effects';
import RNSound from 'react-native-sound';

import { Creators as PlayerActions } from '../ducks/player';

const Sound = new RNSound();

export function* play() {
  try {
    yield call(Sound.play);
  } catch(err) {
    console.tron.log(err);
  }
}

export function* pause() {
  try {
    console.tron.log('pause')
    yield call(Sound.pause);
  } catch(err) {
    console.tron.log(err);
  }
}

export function* next() {
  try {
    const player = yield select(state => state.player);
    const currentIndex = player.list.findIndex(song => song.id === player.currentSong.id);
    const nextSong = player.list[currentIndex + 1];
    if(nextSong) {
      yield put(PlayerActions.setSongRequest(nextSong, player.list))
    }
  } catch (err) {
    console.tron.log(err)
  }
}

export function* previous() {
  try {
    const player = yield select(state => state.player);
    const currentIndex = player.list.findIndex(song => song.id === player.currentSong.id);
    const nextSong = player.list[currentIndex -1];

    if(nextSong) {
      yield put(PlayerActions.setSongRequest(nextSong, player.list))
    }
  } catch (err) {

  }
}

export function* setSong(action) {
  try {
    if(Sound.isLoaded()) yield call(Sound.release);
    
    yield call(Sound.init, action.payload.song.file);
    yield call(play);

    yield put(PlayerActions.setSongSuccess(action.payload.song, action.payload.list))
  } catch(err){
    yield put(PlayerActions.setSongFailure('Erro ao iniciar a música'));
  }
}