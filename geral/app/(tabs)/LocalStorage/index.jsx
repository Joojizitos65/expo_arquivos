import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [memorias, setMemorias] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const carregarMemorias = async () => {
      try {
        const jsonMemorias = await AsyncStorage.getItem('@memorias');
        if (jsonMemorias !== null) {
          setMemorias(JSON.parse(jsonMemorias));
        }
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar as memórias.');
      }
    };
    carregarMemorias();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Memórias</Text>
      </View>

      <FlatList
        data={memorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memoriaItem}>
            {}
            {item.foto ? (
              <Image source={{ uri: item.foto }} style={styles.memoriaFoto} />
            ) : (
              <Text style={styles.emptyImageText}>Sem imagem</Text>
            )}

            {}
            <Text style={styles.memoriaTitulo}>{item.titulo}</Text>
            <Text style={styles.memoriaDescricao}>{item.descricao}</Text>
            <Text style={styles.memoriaQuando}>Quando: {item.quando}</Text>
            <Text style={styles.memoriaOnde}>Onde: {item.onde}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma memória adicionada.</Text>}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('./NovasMemorias/')}
      >
        <Text style={styles.buttonText}>Adicionar Memória</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 1,
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#6200EE',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  memoriaItem: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  memoriaFoto: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  emptyImageText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  memoriaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  memoriaDescricao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  memoriaQuando: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  memoriaOnde: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
