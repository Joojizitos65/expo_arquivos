// app/(tabs)/Carrinho/index.jsx
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Modal } from 'react-native';
import { CartContext } from '../src/context/CartContext'; 
import { Link } from 'expo-router';

export default function CartScreen() {
  const { cartItems, totalValue } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheckout = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name} - {item.quantity}x</Text>
            <Text>R${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>Carrinho vazio</Text>}
      />
      <Text style={styles.total}>Total: R${totalValue.toFixed(2)}</Text>
      {cartItems.length > 0 && (
        <Button title="Finalizar Compra" onPress={handleCheckout} color="#4CAF50"/>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Compra realizada!</Text>
            <Button title="OK" onPress={() => setModalVisible(false)}  />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});
