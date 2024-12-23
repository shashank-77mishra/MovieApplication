import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MovieCard = ({title}) => {
  return (
    <View style={styles.card}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
    elevation: 2,
  },
});

export default MovieCard;
