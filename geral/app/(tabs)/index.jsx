import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
export default function telaprincipal(){
    return(
        <View>
            <Link href='./PokemonAPI'>Pokemon</Link>
            <Link href='./Santander'>Santander</Link>
            <Link href='./Sobremim/'>Sobre mim</Link>
            <Link href='/Ifome/'>Ifome</Link>
            <Link href='./Galeria/'>Galeria</Link>
            <Link href='./Camera/'>Câmera</Link>
            <Link href='./LocalStorage/'>Memórias</Link>
        </View>
    )
}