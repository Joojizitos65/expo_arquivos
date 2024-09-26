
import React, { useState } from 'react';
import { StyleSheet, View, Alert, SafeAreaView } from 'react-native';
import AccountSummary from './Conta';
import TransactionForm from './Transacao';

const App = () => {
  const [saldo, setSaldo] = useState(7320.92);
  const [valor, setValor] = useState('');

  const handleDepositar = () => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para depósito.');
      return;
    }
    const bonus = valorNum * 0.01;
    setSaldo(saldo + valorNum + bonus);
    setValor('');
  };

  const handleSacar = () => {
    const valorNum = parseFloat(valor);
    if (isNaN(valorNum) || valorNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido para saque.');
      return;
    }
    if (valorNum > saldo) {
      Alert.alert('Erro', 'Saldo insuficiente.');
      return;
    }
    const saldoRestante = saldo - valorNum;
    const multa = saldoRestante * 0.025;
    setSaldo(saldoRestante - multa);
    setValor('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AccountSummary saldo={saldo} />
      <TransactionForm 
        valor={valor}
        setValor={setValor}
        handleDepositar={handleDepositar}
        handleSacar={handleSacar}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default App;
