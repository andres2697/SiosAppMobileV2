import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, useWindowDimensions, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Dashboard from '../../views/Dashboard';
import Correctivo from '../../views/Correctivo';
import Preventivo from '../../views/Preventivo';
import { useFonts, Urbanist_400Regular } from '@expo-google-fonts/urbanist';
import AppLoading from "expo-app-loading";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts as Fuentes } from "expo-font";
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth } from "firebase/auth";

const Drawer = createDrawerNavigator();

const Sidebar = () => {

    const [degrees, setDegrees] = useState(0);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [estado, setEstado] = useState(false);
    const [retardo, setRetardo] = useState(false);

    const auth = getAuth();
    const navigation = useNavigation();

    const animatedStyles = {
        height: animation,
        opacity: 5
    }
    const window= useWindowDimensions();

    const Iconos = createIconSetFromIcoMoon(
        require("../../icons/selection.json"),
        "IcoMoon",
        "icomoon.ttf"
    );
    const [iconsLoaded] = Fuentes({
        IcoMoon: require("../../icons/icomoon.ttf"),
    });
    const [fontsLoaded] = useFonts({
        Urbanist_400Regular,
    });

    if (!iconsLoaded || !fontsLoaded) {
        return <AppLoading />;
    }

    startAnimate = (valorNuevo) => {
        Animated.timing(animation, {
            toValue: valorNuevo,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    CustomDrawerContent = (props) => {

        const route = useRoute();
        const user = route.params.user;

        return (
            <DrawerContentScrollView {...props} style={ [styles.menuContainer, {height: window.height}] }>
                <View style={ [styles.optionsContainer, {height: window.height}] }>
                    <View style={ [styles.menuItemsCardTitle, styles.paddingTitle] }>
                        <View style={
                                {
                                    backgroundColor: 'white',
                                    borderRadius: 50,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'flex-start'
                                }
                            }
                        >
                            <Iconos name="usuarioAzul" size={40} style={styles.iconoAzul}/>
                        </View>
                        <View style={
                            {
                                flexDirection: 'column',
                                paddingLeft: '7%',
                            }
                        }>
                            <Text style={{color: 'white', fontFamily: 'Urbanist_400Regular', fontSize: 16}}>
                                Bienvenido(a),
                            </Text>
                            <Text style={{color: 'white', fontFamily: 'Urbanist_400Regular', fontSize: 16}}>
                                { user }
                            </Text>
                        </View>
                    </View>
                    <View style={ styles.optionsDrawer }>
                        <View
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: 0.5,
                                flex: 0,
                                width: '85%',
                                marginLeft: '5%',
                                marginTop: '-70%',
                                marginBottom: 15
                            }}
                        >
                        </View>

                        <View style={ [styles.menuItemsCard, styles.paddingCard] } >
                            <Iconos name="notificaciones" size={43} style={styles.iconosStyle}/>
                            <DrawerItem
                                style={ styles.drawerItemStyle }
                                label="Notificaciones"
                                labelStyle={ styles.drawerItemLabelStyle }
                                activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                onPress={() => {
                                    props.navigation.navigate("Screen1");
                                }}
                                />
                        </View>

                        <View style={ [styles.menuItemsCard, styles.paddingCard] } >
                            <Iconos name="dashboard" size={43} style={styles.iconosStyle}/>
                            <DrawerItem
                                style={ styles.drawerItemStyle }
                                label="Dashboard"
                                activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                labelStyle={ styles.drawerItemLabelStyle }
                                onPress={() => {
                                    props.navigation.navigate("Dashboard");
                                }}
                            />
                        </View>

                        <View style={ [styles.menuItemsCard, styles.paddingCard] } >
                            <Iconos name="capturaFolio" size={43} style={styles.iconosStyle}/>
                            <View style={{flex:1, width: '100%'}}>
                                <DrawerItem
                                    style={ styles.drawerItemStyle }
                                    label="Folios asignados"
                                    activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                    labelStyle={ styles.drawerItemLabelStyle }
                                    onPress={() => {
                                        degrees == 0 ? setDegrees(1) : setDegrees(0);
                                        estado == false ? startAnimate(120) : startAnimate(0);
                                        setEstado(!estado);
                                    }}
                                    />
                            </View>
                            <View style={ [{ 
                                flex: 0, 
                                paddingRight: '5%', 
                                justifyContent: 'flex-start',
                                transform: [{ rotateX: degrees == 0 ? '0deg' :'180deg' }]
                            }] }>
                                <Iconos name="expandirMas" size={43} style={styles.iconosStyleRight} onPress={()=>{
                                    degrees == 0 ? setDegrees(1) : setDegrees(0);
                                    estado == false ? startAnimate(120) : startAnimate(0);
                                    setEstado(!estado);
                                }}/>
                            </View>
                        </View>

                        <View>
                            <Animated.View style={ animatedStyles }>
                                <View style={ [styles.menuItemsCard, styles.paddingCardDisplay] } >
                                    <Iconos name="preventivo" size={43} style={styles.iconosStyle}/>
                                    <DrawerItem
                                        style={ styles.drawerItemStyle }
                                        label="Preventivo"
                                        activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                        labelStyle={ styles.drawerItemLabelStyle }
                                        onPress={() => {
                                            props.navigation.navigate("Preventivo");
                                        }}
                                        />
                                </View>
                                <View style={ [styles.menuItemsCard, styles.paddingCardDisplay] } >
                                    <Iconos name="correctivo" size={43} style={styles.iconosStyle}/>
                                    <DrawerItem
                                        style={ styles.drawerItemStyle }
                                        label="Correctivo"
                                        activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                        labelStyle={ styles.drawerItemLabelStyle }
                                        onPress={() => {
                                            props.navigation.navigate("Correctivo");
                                        }}
                                        />
                                </View>
                            </Animated.View>
                        </View>

                        <View style={ [styles.menuItemsCard, styles.paddingCard] } >
                            <Iconos name="modoOscuro" size={38} style={[styles.iconosStyle, {paddingLeft: '2%'}]}/>
                            <DrawerItem
                                style={ [styles.drawerItemStyle, {paddingRight: 5}] }
                                label="Tema"
                                activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                labelStyle={ styles.drawerItemLabelStyle }
                                onPress={() => {
                                    props.navigation.navigate("Screen1");
                                }}
                                />
                        </View>

                        <View style={ [styles.menuItemsCard, styles.paddingCard] } >
                            <Iconos name="importante" size={43} style={styles.iconosStyle}/>
                            <DrawerItem
                                style={ styles.drawerItemStyle }
                                label="Avisos"
                                activeBackgroundColor={'rgbo: (255, 255, 255, 0.5)'}
                                labelStyle={ styles.drawerItemLabelStyle }
                                onPress={() => {
                                    props.navigation.navigate("Screen1");
                                }}
                                />
                        </View>
                        <View style={ [styles.menuItemsCard, styles.paddingCard, styles.paddingExit] } >
                            <Iconos name="logOut" size={43} style={styles.iconosStyle}/>
                            <DrawerItem
                                style={ [styles.drawerItemStyle, {paddingRight: 40}] }
                                label="Salir"
                                labelStyle={ styles.drawerItemLabelStyle }
                                onPress={async() => {
                                    // props.navigation.navigate("Login");
                                    let cerrarSesion = await auth
                                                                .signOut()
                                                                .then(() => console.log('User signed out!'));
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }],
                                    });
                                }}
                                />
                        </View>
                    </View>
                </View>
            </DrawerContentScrollView>
        );
      }
    return(
        // <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Dashboard"
                
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                {/* <Drawer.Screen
                    options={{ headerShown: false }}
                    name="Login"
                    component={Login}
                /> */}
                <Drawer.Screen
                    // drawerContent={(props) => <CustomDrawerContent {...props} />}
                    name="Dashboard"
                    component={Dashboard}
                    />
                <Drawer.Screen
                    // drawerContent={(props) => <CustomDrawerContent {...props} />}
                    name="Correctivo"
                    component={Correctivo}
                />
                <Drawer.Screen
                    options={{ headerShown: false }}
                    name="Preventivo"
                    component={Preventivo}
                    initialParams={{img: false }}
                />
            </Drawer.Navigator>
        // </NavigationContainer>
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
        top: '80%',
        position: 'absolute',
        flex: 2
    },
    drawerItemStyle: {
        flex: 1, 
        width: '100%',
        marginBottom: -2,
    }, 
    drawerItemLabelStyle: {
        color: "white", 
        fontSize: 16,
        fontFamily: 'Urbanist_400Regular',
        flex: 0
    },
    iconosStyle: {
        color: 'white', 
        fontFamily: 'Urbanist_400Regular',
        paddingTop: '4%'
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
  