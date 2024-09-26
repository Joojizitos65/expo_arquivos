import React from 'react';
import { CartProvider } from './Ifome/src/context/CartContext';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <CartProvider>
      <Stack />
    </CartProvider>
  );
}
