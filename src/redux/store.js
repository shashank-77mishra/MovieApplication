import {configureStore} from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import genresReducer from './genreSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    genres: genresReducer,
  },
});
