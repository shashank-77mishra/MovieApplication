import {createSlice} from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload.id;
      const exists = state.favoriteMovies.find(movie => movie.id === movieId);

      if (exists) {
        state.favoriteMovies = state.favoriteMovies.filter(
          movie => movie.id !== movieId,
        );
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
