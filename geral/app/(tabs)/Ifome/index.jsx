import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Loja!</Text>
      <Link href="./Menu/" style={styles.link}>
        Ir para o Menu
      </Link>
      <Link href="./Carrinho/" style={styles.link}>
        Ir para o Carrinho
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 10,
  },
});
