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
        </View>
    )
}