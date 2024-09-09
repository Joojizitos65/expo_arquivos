import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function PokemonPickerPage() {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        setTypes(data.results);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedType) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(response => response.json())
        .then(data => {
          const pokemonList = data.pokemon.map(p => p.pokemon);
          setPokemons(pokemonList);
          setSelectedPokemon(''); 
          setPokemonDetails(null); 
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  }, [selectedType]);

  useEffect(() => {
    if (selectedPokemon) {
      setLoading(true);
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(response => response.json())
        .then(data => {
          setPokemonDetails(data);
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  }, [selectedPokemon]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o Tipo de Pokémon</Text>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue) => setSelectedType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um tipo" value="" />
        {types.map(type => (
          <Picker.Item key={type.name} label={type.name} value={type.name} />
        ))}
      </Picker>

      <Text style={styles.title}>Selecione o Pokémon</Text>
      <Picker
        selectedValue={selectedPokemon}
        onValueChange={(itemValue) => setSelectedPokemon(itemValue)}
        style={styles.picker}
        enabled={!!selectedType}
      >
        <Picker.Item label="Selecione um Pokémon" value="" />
        {pokemons.map(pokemon => (
          <Picker.Item key={pokemon.name} label={pokemon.name} value={pokemon.name} />
        ))}
      </Picker>

      {pokemonDetails && (
        <View style={styles.pokemonDetails}>
          <Text style={styles.pokemonName}>{pokemonDetails.name}</Text>
          <Image
            source={{ uri: pokemonDetails.sprites.front_default }}
            style={styles.pokemonImage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  pokemonDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  pokemonName: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
});
