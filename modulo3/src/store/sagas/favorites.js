import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';
import { addFavoritesSuccess, addFavoritesError } from '../actions/favorites';

export function* addFavoritesRequest(action) {
  try {
    const response = yield call(api.get, `/repos/${action.payload.reponame}`);
    const favorites = yield select(state => state.favorites.data);

    if (favorites.find(favorite => favorite.id === response.data.id)) {
      yield put(addFavoritesError('repositorio duplicado'));
    } else {
      yield put(addFavoritesSuccess(response.data));
    }
  } catch (err) {
    yield put(addFavoritesError('repositorio inexistente'));
  }
}
