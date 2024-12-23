import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setSelectedGenres} from '../redux/genreSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Fantasy',
];

const GenreSelectionScreen = ({navigation}) => {
  const [selectedGenres, setLocalSelectedGenres] = useState([]);
  const dispatch = useDispatch();

  const toggleGenre = genre => {
    setLocalSelectedGenres(prev => {
      if (prev.includes(genre)) {
        return prev.filter(g => g !== genre);
      } else {
        return [...prev, genre];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedGenres.length > 0) {
      dispatch(setSelectedGenres(selectedGenres));
      await AsyncStorage.setItem(
        'selectedGenres',
        JSON.stringify(selectedGenres),
      );
      navigation.navigate('MainApp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Favorite Genres</Text>
      <Text style={styles.subtitle}>Pick at least one genre to continue</Text>

      <ScrollView style={styles.genreContainer}>
        {GENRES.map(genre => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre) && styles.selectedGenre,
            ]}
            onPress={() => toggleGenre(genre)}>
            <Text
              style={[
                styles.genreText,
                selectedGenres.includes(genre) && styles.selectedGenreText,
              ]}>
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedGenres.length === 0 && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={selectedGenres.length === 0}>
        <Text style={styles.continueButtonText}>
          Continue ({selectedGenres.length} selected)
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E21221',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  genreContainer: {
    flex: 1,
    marginBottom: 20,
  },
  genreButton: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedGenre: {
    backgroundColor: '#E21221',
    borderColor: '#E21221',
  },
  genreText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGenreText: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#E21221',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default GenreSelectionScreen;
