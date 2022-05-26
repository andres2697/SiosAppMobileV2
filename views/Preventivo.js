import { StyleSheet, Text, View, Animated, useWindowDimensions, ActivityIndicator, Pressable, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState, useEffect, useCallback, useRef } from "react";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import AppLoading from "expo-app-loading";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from 'expo-camera';
import Camara from './components/Camara';
import Cabecera from './components/Cabecera';
import { useNavigation, NavigationAction, useRoute } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation'; 

import { GLView } from 'expo';
import Expo2DContext from 'expo-2d-context';

const Preventivo = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const capturedPhoto = route.params.img;
    const [cargado, setCargado] = useState(false);  
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState(0);
    
    // console.log(capturedPhoto);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            allowsMultipleSelection: false,
            aspect: [4, 3],
            quality: 1
        });

        if(!result.cancelled){
            setImage(result.uri);
        }
    }
    
    const onGLContextCreate = (gl) => {
        console.log('HASTA AQUÍ LLEGA');
        console.log(capturedPhoto);
        var ctx = new Expo2DContext(gl);
        // await ctx.initializeText();
        // ctx.fillStyle = "blue";
        // ctx.font = "italic 72pt sans-serif";
        // ctx.fillText("Hey Galaxy", 10, 200);
        // ctx.drawImage(capturedPhoto, 0, 0);
        // ctx.translate(50,200)
        // ctx.scale(4,4)
        // ctx.fillStyle = "grey";
        // ctx.fillRect(20, 40, 100, 100);
        // ctx.fillStyle = "white";
        // ctx.fillRect(30, 100, 20, 30);
        // ctx.fillRect(60, 100, 20, 30);
        // ctx.fillRect(90, 100, 20, 30);
        // ctx.beginPath();
        // ctx.arc(50,70,18,0,2*Math.PI);
        // ctx.arc(90,70,18,0,2*Math.PI);
        // ctx.fill();
        // ctx.fillStyle = "grey";
        // ctx.beginPath();
        // ctx.arc(50,70,8,0,2*Math.PI);
        // ctx.arc(90,70,8,0,2*Math.PI);
        // ctx.fill();
        // ctx.strokeStyle = "black";
        // ctx.beginPath();
        // ctx.moveTo(70,40);
        // ctx.lineTo(70,30);
        // ctx.arc(70,20,10,0.5*Math.PI,2.5*Math.PI);

        // ctx.stroke();}
        ctx.flush();
    }

    const Iconos = createIconSetFromIcoMoon(
        require("../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
        );
        const [iconsLoaded] = Fuentes({
        IcoMoon: require("../icons/icomoon.ttf"),
    });
    const [fontsLoaded] = useFonts({
        Urbanist_400Regular,
    });
    
    if (!iconsLoaded || !fontsLoaded ) {
        return <AppLoading />
    }

    if(!cargado){
        setTimeout(function () {
            setCargado(true);
        }, 1200);
        clearTimeout();                           
        return(
            <View style={{ justifyContent: "center", backgroundColor: '#ffffff', width: '100%', height:'100%' }}> 
                <ActivityIndicator
                    size="large"
                    color="#2166E5"
                    animating={!cargado}
                />  
            </View>
        );
    }else{
            return (
              <View style={styles.contenedorPrincipal}>
                <Cabecera></Cabecera>
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: 'center',
                    backgroundColor: 'orange'
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "yellow",
                      width: "80%",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "black", fontSize: 18 }}>
                      Prueba Imagenes
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: "grey",
                      width: "80%",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "green",
                        height: 40,
                        width: '50%',
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        navigation.navigate("Camara");
                      }}
                    >
                      <Text style={{ color: "white", textAlign: "center", fontWeight: '700' }}>
                        Cámara
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={pickImage}
                      style={{
                        backgroundColor: "red",
                        height: 40,
                        width: '50%',
                        justifyContent: "center",
                        alignItems: 'center'
                    }}
                    >
                      <Text style={{ color: "white", textAlign: "center", fontWeight: '700' }}>Pick an image</Text>
                    </Pressable>
                </View>
                <View style={{width: '80%', flexDirection: 'row'}}>
                    <View style={[{
                            width: '50%',
                            display: capturedPhoto === false ? 'none' : 'flex'
                    }]}>
                        <Image
                            source={{ uri: capturedPhoto.uri }}
                            style={{ width: '100%', height: 150 }}
                            ></Image>
                        {/* {capturedPhoto && (
                            <GLView
                                style={{ flex: 1, width: '100%', height: 150 }}
                                onContextCreate={()=>{onGLContextCreate();}}
                            />
                        )} */}
                    </View>
                    {image && (
                        <View style={[{width: '50%',}
                        ]}>
                            <Image
                                source={{ uri: image }}
                                style={{ width: '100%', height: 150 }}
                                ></Image>
                        </View>
                    )}
                    </View>
                </View>
              </View>
            );
        }
}

export default Preventivo;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'white',
        // flexDirection: "row"
    },
});