export const addFavoritesRequest = reponame => ({
  type: 'ADD_FAVORITE_REQUEST',
  payload: {
    reponame,
  },
});

export const addFavoritesSuccess = repository => ({
  type: 'ADD_FAVORITE_SUCCESS',
  payload: {
    repository,
  },
});

export const addFavoritesError = error => ({
  type: 'ADD_FAVORITE_ERROR',
  payload: {
    error,
  },
});
