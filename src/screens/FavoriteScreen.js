import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';

const FavoriteScreen = ({navigation}) => {
  const favorites = useSelector(state => state.favorites.favoriteMovies);

  const renderMovieCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MovieDetail', {movie: item})}>
      <Image
        source={{uri: item.poster}}
        style={styles.poster}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.movieTitle}>{item.title}</Text>
        <Text style={styles.movieTitle1}>{item.plot}</Text>
        <Text style={styles.movieYear}>{item.year}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={require('../good-feedback.png')}
            style={styles.searchIcon}
          />
          <Text style={styles.rating}>{item.rating}/10</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require('../heart-rate.png')}
            style={{width: 30, height: 30}}
          />
          <Text style={styles.emptyText}>No favorite movies yet</Text>
          <Text style={styles.emptySubtext}>
            Your favorite movies will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderMovieCard}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  poster: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  movieTitle1: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#000',
    marginBottom: 8,
  },
  searchIcon: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default FavoriteScreen;
