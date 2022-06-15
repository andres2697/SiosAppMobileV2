import React, {useState, useEffect} from 'react';
import {View, Text, Animated, useWindowDimensions, StyleSheet} from 'react-native';
import Cabecera from '../Cabecera';
import { useNavigation } from '@react-navigation/native';

const Avisos = () => {
    const navigation = useNavigation();
    return(
        <View style={styles.contenedorPrincipal}>
            <Cabecera navigation={navigation}></Cabecera>
            <View style={styles.contenedorComponente}>
                <Text>Hola desde Avisos</Text>
            </View>
        </View>
    );
}
export default Avisos;

const styles = StyleSheet.create({
    contenedorPrincipal: {
        width: "100%",
        height: "100%",
    },
    contenedorComponente: {
        width:'100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: 'white'
    }
});