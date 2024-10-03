import { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, Button, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Camera(){
    const [permissao, pedirpermisao] = useCameraPermissions();
    const [foto, setfoto] = useState(null);
    const cameraRef = useRef(null);
    const [mostrarFoto, setMostrarFoto] = useState(null);


    if (!permissao){
        return <View></View>
    }
    if (!permissao.granted){
        return(
            <View style={styles.container}>
                <Text style={styles.textoPermissao}> O aplicativo deseja utilizar a câmera.</Text>
                <Button title="Pedir Permissão" onPress={pedirpermisao} />
            </View>
        )
    }

    const tirarFoto = async () => {
        const foto_base64 = await cameraRef.current?.takePictureAsync({
            quality: 0.5,
            base64: true
        })
        setfoto(foto_base64)
        setMostrarFoto(true)
    }

    return(
        <View style={styles.container}>
            {foto ? 
            <View>
                <Image source={{uri: foto.uri }} style={styles.foto}/> 
            </View> :
        <CameraView facing={"back"} style={styles.camera} ref={cameraRef}>
            <Button title='tirar fotos' onPress={tirarFoto}/>
        </CameraView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    textoPermissao:{
        textAlign:'center',

    },
    camera:{
        flex: 1
    },
    foto:{
        width: '100%',
        height: '80%'
    }
})