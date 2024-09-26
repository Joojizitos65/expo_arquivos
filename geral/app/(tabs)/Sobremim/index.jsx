import { Link } from 'expo-router';
import {View, Text, StyleSheet, Image} from 'react-native';
import React from "react";
import Cabecalho from '../../../components/CompoSobremim/Cabecalho';
import perfil from './perfil.jpg'
export default function tela1(){
    const imageSource = {}

    const styles = StyleSheet.create({
        texto1:{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            marginTop: 250
        },
        imagemp:{
            width: 250,
            height: 250,
        
            marginBottom: 20,
            borderRadius: 100,
            
        }
    })
    
    return(
        
        <View>
            
            <Cabecalho/>
            
            <Text style={styles.texto1}>Bem-Vindo aos meus apps</Text>
            
        </View>
    )
}