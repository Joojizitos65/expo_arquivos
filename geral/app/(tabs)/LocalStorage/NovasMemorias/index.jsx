import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function AddMemoryScreen() {
  const [titulo, setTitulo] = useState('');
  const [quando, setQuando] = useState('');
  const [onde, setOnde] = useState('');
  const [descricao, setDescricao] = useState('');
  const [foto, setFoto] = useState(null);
  const router = useRouter();

  const escolherFoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFoto(result.assets[0].uri);
      } else {
        Alert.alert('Erro', 'Seleção de imagem cancelada ou falhou.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao selecionar a imagem.');
      console.error(error);
    }
  };

  const adicionarMemoria = async () => {
    if (!titulo || !quando || !onde || !descricao || !foto) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const novaMemoria = {
      id: Date.now().toString(),
      titulo,
      quando,
      onde,
      descricao,
      foto,
    };

    try {
      const jsonMemorias = await AsyncStorage.getItem('@memorias');
      const memorias = jsonMemorias ? JSON.parse(jsonMemorias) : [];
      const memoriasAtualizadas = [novaMemoria, ...memorias];

      await AsyncStorage.setItem('@memorias', JSON.stringify(memoriasAtualizadas));
      router.back();
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a memória.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Quando"
        value={quando}
        onChangeText={setQuando}
      />
      <TextInput
        style={styles.input}
        placeholder="Onde"
        value={onde}
        onChangeText={setOnde}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
      />

      {}
      {foto ? (
        <Image source={{ uri: foto }} style={styles.image} />
      ) : (
        <Text style={styles.placeholderText}>Nenhuma foto selecionada</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={escolherFoto}>
        <Text style={styles.buttonText}>Escolher Foto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={adicionarMemoria}>
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#6200EE',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 10,
  },
});
