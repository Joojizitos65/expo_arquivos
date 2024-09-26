// TransactionForm.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

const TransactionForm = ({ valor, setValor, handleDepositar, handleSacar }) => {
  return (
    <View style={styles.container}>
      <br></br><TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        placeholder="Digite o valor"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSacar}>
          <Text style={styles.buttonText}>Sacar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDepositar}>
          <Text style={styles.buttonText}>Depositar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%', 
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
   
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '88%',
    height: 40,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff0000'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default TransactionForm;
