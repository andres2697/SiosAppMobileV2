import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet, 
  Animated, 
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation, useRoute, StackActions, CommonActions } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { useFonts as Fuentes } from "expo-font";
import AppLoading from "expo-app-loading";
import { Divider } from "react-native-paper";

const CustomDrawerContent = (props) => {

  const [degrees, setDegrees] = useState(0);
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [estado, setEstado] = useState(false);

  const auth = getAuth();
  const navigation = useNavigation();
  const window = useWindowDimensions();

  // const route = useRoute();
  const user = auth.currentUser.displayName;

  const Elemento = ({logo, texto, ventana}) => {
    return(<View style={{ flexDirection: 'row', marginLeft: '7%', marginRight:'3%' }}>
            <Iconos name={logo} size={40} style={styles.iconosStyle} />
            <DrawerItem
            style={[styles.drawerItemStyle, { paddingRight: '10%' }]}
            label={texto}
            labelStyle={styles.drawerItemLabelStyle}
            onPress={() => {
                switch(ventana){
                  case 'Notificaciones':
                      // navigation.navigate('Tabs', {ruta: 1});
                      navigation.navigate('Notificaciones');
                    break;
                  case 'Dashboard':
                      navigation.navigate('Dashboard');
                    break;
                  case 'ModoOscuro':
                      navigation.navigate('ModoOscuro');
                    break;
                  case 'Avisos':
                      navigation.navigate('Avisos');
                    break;
                }
            }}
            />
          </View>
    );
  }
  
  const InfoUsuario = () =>{
    return (
      <View style={[styles.menuItemsCardTitle, styles.paddingTitle]}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 50,
                width: 40,
                height: 40,
                justifyContent: "flex-start",
              }}
            >
              <Iconos name="usuarioAzul" size={40} style={styles.iconoAzul} />
            </View>
            <View
              style={{
                flexDirection: "column",
                paddingLeft: "7%",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Urbanist_400Regular",
                  fontSize: 16,
                }}
              >
                Bienvenido(a),
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "Urbanist_400Regular",
                  fontSize: 16,
                }}
              >
                {user}
              </Text>
            </View>
          </View>
    );
  }
  // const animatedStyles = {
  //   height: animation,
  //   opacity: 5,
  // };

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
    <View style={{flex:1}}>
      <DrawerContentScrollView
        {...props}
        style={[styles.menuContainer, { height: window.height}]}
      >
        <View style={[styles.optionsContainer, { height: (window.height * 100)/100  }]}>
          <InfoUsuario></InfoUsuario>
          <View style={styles.optionsDrawer}>
            <View
              style={{
                borderBottomColor: "white",
                borderBottomWidth: 0.5,
                // flex: 0,
                width: "85%",
                marginLeft: "5%",
                marginTop: "-95%",
                marginBottom: 15,
              }}
            ></View>
            <View style={{ flex: 0 }}>
              <DrawerItemList {...props}></DrawerItemList>
            </View>
            <View style={{flex:2}}>
              <View style={[styles.menuItemsCard, styles.paddingCard]}>
                <Elemento logo='notificaciones' texto='Notificaciones' ventana='Notificaciones'></Elemento>
              </View>
              <View style={[styles.menuItemsCard, styles.paddingCard]}>
                <Elemento logo='dashboard' texto='Dashboard' ventana='Dashboard'></Elemento>
              </View>
              <View style={[styles.menuItemsCard, styles.paddingCard]}>
                <Elemento logo='modoOscuro' texto='Tema' ventana='ModoOscuro'></Elemento>
              </View>
              <View style={[styles.menuItemsCard, styles.paddingCard]}>
                <Elemento logo='importante' texto='Avisos' ventana='Avisos'></Elemento>
              </View>
            </View>      
            <View
              style={[styles.menuItemsCard, styles.paddingCard, styles.paddingExit ]}
            >
              <View
                style={{
                  borderBottomColor: "white",
                  borderBottomWidth: 0.5,
                  // flex: 0,
                  width: "85%",
                  marginLeft: "5%",
                  // marginTop: "-70%",
                    // marginBottom: 15,
                }}
              ></View>

              <View style={{ flexDirection: 'row', marginLeft: '7%', marginBottom: 30, marginRight:'3%' }}>
                  <Iconos name="logOut" size={40} style={styles.iconosStyle} />
                  <DrawerItem
                  style={[styles.drawerItemStyle, { paddingRight: 40 }]}
                  label="Salir"
                  labelStyle={styles.drawerItemLabelStyle}
                  onPress={async () => {
                      // props.navigation.navigate("Login");
                      let cerrarSesion = await auth
                      .signOut()
                      .then(() => console.log("User signed out!"));
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 1,
                          routes:[
                            {name: 'Login'}
                          ],
                        })
                      );
                      // navigation.reset({
                      // index: 0,
                      // actions: [navigation.navigate(routeName)],
                      // routes: [{ name: "Stack" }],
                      // });
                  }}
                  />
              </View>
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
      /* <View style={{ flex: 1, backgroundColor: "#101D2D", height: '10%', width: '100%', flexDirection: 'column', paddingLeft: '7%' }}>
      <View style={{ flex: 1, backgroundColor: "#101D2D", flexDirection: 'row', width: '100%' }}>
            <Iconos name="capturaFolio" size={43} style={styles.iconosStyle} />
            <View style={{ flex: 1, height: '15%' }}>
            <DrawerItem
            style={{
              flex: 2,
              width: "195%",
              color: "white",
                }}
                label="Folios asignados"
                activeBackgroundColor={"rgbo: (255, 255, 255, 0.5)"}
                labelStyle={styles.drawerItemLabelStyle}
                onPress={() => {
                  degrees == 0 ? setDegrees(1) : setDegrees(0);
                  estado == false ? startAnimate(120) : startAnimate(0);
                  setEstado(!estado);
                }}
                />
            </View>
            <View
                style={[
                {
                    flex: 1,
                    // backgroundColor: 'green',
                    height: '10%',
                    width: '10%',
                    paddingRight: "5%",
                    justifyContent: "flex-start",
                    transform: [{ rotateX: degrees == 0 ? "0deg" : "180deg" }],
                },
                ]}
            >
                <Iconos
                name="expandirMas"
                size={43}
                style={styles.iconosStyleRight}
                onPress={() => {
                    degrees == 0 ? setDegrees(1) : setDegrees(0);
                    estado == false ? startAnimate(120) : startAnimate(0);
                    setEstado(!estado);
                }}
                />
            </View>
          </View>
        </View>
        <View>
          <Animated.View style={animatedStyles}>
            <View style={[styles.menuItemsCard, styles.paddingCardDisplay]}>
              <Iconos name="preventivo" size={43} style={styles.iconosStyle} />
              <DrawerItem
                style={styles.drawerItemStyle}
                label="Preventivo"
                activeBackgroundColor={"rgbo: (255, 255, 255, 0.5)"}
                labelStyle={styles.drawerItemLabelStyle}
                onPress={() => {
                  props.navigation.navigate("Preventivo");
                }}
              />
            </View>
            <View style={[styles.menuItemsCard, styles.paddingCardDisplay]}>
              <Iconos name="correctivo" size={43} style={styles.iconosStyle} />
              <DrawerItem
                style={styles.drawerItemStyle}
                label="Correctivo"
                activeBackgroundColor={"rgbo: (255, 255, 255, 0.5)"}
                labelStyle={styles.drawerItemLabelStyle}
                onPress={() => {
                  props.navigation.navigate("Correctivo");
                }}
              />
            </View>
          </Animated.View>
        </View> */
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  menuContainer: {
    // width: "100%",
    backgroundColor: "#101D2D",
    // letterSpacing: 0
  },
  optionsContainer: {
    width: "100%",
    flex: 2,
    flexDirection: "column",
  },
  optionsDrawer: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "column",
    marginTop: '-25%'
  },
  menuItemsCard: {
    width: "100%",
    height: "10%",
    flex: 0,
    flexDirection: "column",
  },
  menuItemsCardTitle: {
    width: "100%",
    height: "30%",
    flex: 1,
    flexDirection: "row",
  },
  paddingTitle: {
    marginTop: 30,
    justifyContent: "flex-start",
    // marginBottom: 5,
    paddingLeft: "5%",
  },
  paddingCard: {
    justifyContent: "space-between",
    paddingLeft: "2%",
  },
  paddingCardDisplay: {
    justifyContent: "space-between",
    paddingLeft: "12%",
    flex: 1,
  },
  paddingExit: {
    // marginTop: '120%',
    top: "78%",
    position: "absolute",
    flex: 2,
  },
  drawerItemStyle: {
    flex: 1,
    width: "100%",
    // marginBottom: -2,
    height: 80,
    color: "white",
  },
  drawerItemLabelStyle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Urbanist_400Regular",
    flex: 0,
  },
  iconosStyle: {
    color: "white",
    fontFamily: "Urbanist_400Regular",
    paddingTop: "4%",
  },
  iconosStyleRight: {
    color: "white",
    fontFamily: "Urbanist_400Regular",
    paddingTop: "10%",
    marginLeft: '40%',
    // marginLeft: -120,
    flex: 0,
  },
  iconoAzul: {
    fontFamily: "Urbanist_400Regular",
    color: "#2166E5",
  },
});
