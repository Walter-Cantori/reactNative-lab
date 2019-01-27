import { all, takeLatest } from 'redux-saga/effects';
import { addFavoritesRequest } from './favorites';

export default function* rootSaga() {
  return yield all([
    takeLatest('ADD_FAVORITE_REQUEST', addFavoritesRequest),
  ]);
}
