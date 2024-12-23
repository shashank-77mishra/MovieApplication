import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleFavorite} from '../redux/favoritesSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const MovieDetailScreen = ({route}) => {
  const {movie} = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favoriteMovies);
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: movie.poster}} style={styles.poster} />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.year}>{movie.year}</Text>
          <View style={styles.ratingContainer}>
            {/* <Icon name="star" size={16} color="#FFD700" /> */}
            <Image
              source={require('../good-feedback.png')}
              style={styles.searchIcon2}
            />
            <Text style={styles.rating}>{movie.rating}/10</Text>
          </View>
        </View>

        <View style={styles.genreContainer}>
          {movie.genre.map((genre, index) => (
            <View key={index} style={styles.genreTag}>
              <Text style={styles.genreText}>{genre}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Director</Text>
          <Text style={styles.sectionText}>{movie.director}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description} numberOfLines={5}>
            {movie.plot}
          </Text>
        </View>

        {movie.cast && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cast</Text>
            <Text style={styles.sectionText}>{movie.cast.join(', ')}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
          ]}
          onPress={() => dispatch(toggleFavorite(movie))}>
          {/* <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#fff' : '#E21221'}
          /> */}
          <Image
            source={require('../heart-rate.png')}
            style={styles.searchIcon}
          />

          <Text
            style={[
              styles.favoriteButtonText,
              isFavorite && styles.favoriteButtonTextActive,
            ]}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  poster: {
    width: width,
    height: width * 1.5,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  year: {
    fontSize: 16,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
    height: 30,
    width: 30,
  },
  searchIcon2: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  genreTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E21221',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  favoriteButtonActive: {
    backgroundColor: '#E21221',
    borderColor: '#E21221',
  },
  favoriteButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E21221',
  },
  favoriteButtonTextActive: {
    color: '#fff',
  },
});
export default MovieDetailScreen;
