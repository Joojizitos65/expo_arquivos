import React, { useContext } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { CartContext } from '../src/context/CartContext'; 
import { Link } from 'expo-router';

const products = [
  { id: 1, name: 'Hamburguer', price: 10.0, image: 'https://cdn.pixabay.com/photo/2017/09/02/13/38/burger-2707320_1280.jpg' },
  { id: 2, name: 'Pizza', price: 15.0, image: 'https://cdn.pixabay.com/photo/2024/04/23/09/32/ai-generated-8714517_1280.jpg' },
  { id: 3, name: 'Batata Frita', price: 20.0, image: 'https://cdn.pixabay.com/photo/2015/07/13/15/20/french-fries-843303_1280.jpg' },
];

export default function MenuScreen() {
  const { addToCart } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R${item.price.toFixed(2)}</Text>
              <Button
                title="Adicionar ao Carrinho"
                onPress={() => addToCart(item)}
                color="#4CAF50"
              />
            </View>
            <View style={styles.separator} />
          </View>
        )}
      />
      <Link href="../Carrinho/">
        <Text style={styles.link}>Ir para o Carrinho</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
    marginVertical: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
  link: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
