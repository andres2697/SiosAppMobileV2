import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import CustomDrawerContent from './CustomDrawerContent';
import { createStackNavigator } from '@react-navigation/stack';

import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes} from "expo-font";
import AppLoading from "expo-app-loading";
import StackSidebar from '../Stack/StackSidebar';

import { getAuth } from "firebase/auth";


const Drawer = createDrawerNavigator();
const StackT = createStackNavigator();

const Sidebar = (props) => {
    
    // const route = useRoute();
    const auth = getAuth();
    const Stcktbs = () => {
        return(
            <StackT.Navigator>
                <StackT.Screen
                    name="Miscelaneos"
                    component={Miscelaneos}
                    options={{
                    title: "Miscelaneos",
                    headerBackButtonMenuEnabled: true,
                    headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <StackT.Screen
                    name="MaterialesTP"
                    component={MaterialesTP}
                    options={{
                    title: "Materiales TP",
                    headerBackButtonMenuEnabled: true,
                    headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <StackT.Screen
                    name="Conceptos"
                    component={Conceptos}
                    options={{
                    title: "Conceptos",
                    headerBackButtonMenuEnabled: true,
                    headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <StackT.Screen
                    name="Observaciones"
                    component={Observaciones}
                    options={{
                    title: "Observaciones",
                    headerBackButtonMenuEnabled: true,
                    headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <StackT.Screen
                    name="Camara"
                    component={Camara}
                    options={{ headerBackButtonMenuEnabled: false, headerShown: false }}
                    initialParams={{ img: false }}
                />
            </StackT.Navigator>
        );
        
      }

    const Iconos = createIconSetFromIcoMoon(
        require("../../../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
    );
    const [iconsLoaded] = Fuentes({
        IcoMoon: require("../../../icons/icomoon.ttf"),
    });
    const [fontsLoaded] = useFonts({
        Urbanist_400Regular,
    });

    if (!iconsLoaded || !fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="StackSidebar"
                component={StackSidebar}
                options={{
                    // swipeEnabled: false,
                    drawerItemStyle: {display: 'none'}
                }}
            />
        </Drawer.Navigator>
    );
}

export default Sidebar;  

const styles = StyleSheet.create({
    menuContainer: {
        width: "100%",
        backgroundColor: '#101D2D',
        // letterSpacing: 0
    },
    optionsContainer: {
        width: '100%', 
        flex: 1,
        flexDirection: 'column',  
    },
    menuItemsCardTitle: {
        width: '100%', 
        height: '30%',
        flex: 1,
        flexDirection: 'row',
    },
    optionsDrawer:{
        width: '100%',
        height: '70%',
        flex: 2,
        flexDirection: 'column',
    },
    menuItemsCard: {
        width: '100%', 
        height: '10%',
        flex: 0,
        flexDirection: 'row',
    },
    paddingTitle:{
        marginTop: 30,
        justifyContent: 'flex-start',
        // marginBottom: 5,
        paddingLeft: '5%', 
    },
    paddingCard:{
        justifyContent: 'space-between',
        paddingLeft: '2%',
    },
    paddingCardDisplay:{
        justifyContent: 'space-between',
        paddingLeft: '12%',
        flex:1
    },
    paddingExit: {
        // marginTop: '120%',
        top: '90%',
        position: 'absolute',
        flex: 2
    },
    drawerItemStyle: {
        flex: 1, 
        width: '100%',
        marginBottom: -2,
        color: "white", 
    }, 
    drawerItemLabelStyle: {
        color: "white", 
        fontSize: 16,
        fontFamily: 'Urbanist_400Regular',
        letterSpacing: 1,
        flex: 0
    },
    iconosStyle: {
        color: 'white', 
        fontFamily: 'Urbanist_400Regular',
        paddingTop: '4%',
        marginRight: -15
    },
    iconosStyleRight: {
        color: 'white', 
        fontFamily: 'Urbanist_400Regular',
        paddingTop: '4%',
        // marginLeft: '20%',
        // marginLeft: -120,
        flex: 1
    },
    iconoAzul: {
        fontFamily: 'Urbanist_400Regular',
        color: '#2166E5'
    },
});

{/* {/* <Drawer.Screen
                name="Correctivo"
                component={Correctivo}
                options={{
                    swipeEnabled: false,
                    drawerItemStyle: {display: 'none'}
                }}
            /> */}
            {/* <Drawer.Screen
                name="Preventivo"
                component={Preventivo}
                options={{
                    swipeEnabled: false,
                    drawerItemStyle: {display: 'none'}
                }}
            /> */}
            {/* <Drawer.Screen
                name="Login"
                component={Login}
                options={{
                    swipeEnabled: false,
                    drawerItemStyle: {display: 'none'}
                }}
            /> */}
            {/* <Drawer.Screen
                name="Notificaciones"
                component={Notificaciones}
                options={{
                    drawerLabelStyle: styles.drawerItemLabelStyle,
                    drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.2)",
                    drawerIcon: () => (
                    <Iconos
                        name="notificaciones"
                        size={40}
                        style={styles.iconosStyle}
                    />
                    ),
                }}
            />*/}
            {/* <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
                drawerLabelStyle: styles.drawerItemLabelStyle,
                drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.2)",
                drawerIcon: () => (
                <Iconos name="dashboard" size={40} style={styles.iconosStyle} />
                ),
            }}
            /> */}
            {/*<Drawer.Screen
            name="Tema"
            component={ModoOscuro}
            options={{
                drawerLabelStyle: styles.drawerItemLabelStyle,
                drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.2)",
                drawerIcon: () => (
                <Iconos name="modoOscuro" size={36} style={styles.iconosStyle} />
                ),
            }}
            // initialParams={{ img: false }}
            /> */}
            {/* <Drawer.Screen
            name="Avisos"
            component={Avisos}
            options={{
                drawerLabelStyle: styles.drawerItemLabelStyle,
                drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.2)",
                drawerIcon: () => (
                <Iconos name="importante" size={43} style={styles.iconosStyle} />
                ),
            }}
            /> */}