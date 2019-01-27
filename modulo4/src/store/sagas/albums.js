import api from '../../services/api';
import { call, put } from 'redux-saga/effects';

import { Creators as AlbumActions } from '../ducks/albums';

export function* getAlbums() {
  try {
    const response = yield call(api.get, '/albums');
    yield put(AlbumActions.getAlbumsSuccess(response.data))
  } catch (err) {
    yield put(AlbumActions.getAlbumsFailure('Erro ao buscar album'))
  }
}