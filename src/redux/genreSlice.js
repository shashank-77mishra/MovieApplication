import {createSlice} from '@reduxjs/toolkit';

const genreSlice = createSlice({
  name: 'genres',
  initialState: {
    selectedGenres: [],
  },
  reducers: {
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload;
    },
  },
});

export const {setSelectedGenres} = genreSlice.actions;
export default genreSlice.reducer;
