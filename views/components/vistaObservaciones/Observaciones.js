  import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    FlatList,
    SafeAreaView,
    Dimensions,
    KeyboardAvoidingView,
    Pressable
  } from "react-native";
  import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
  import { Ionicons } from '@expo/vector-icons';
//   import { TextInput } from "react-native-paper";
  import { ScrollView } from 'react-native-virtualized-view';
  import { useFonts as Fuentes } from "expo-font";
  import { useState, useRef } from "react";
  import { createIconSetFromIcoMoon } from "@expo/vector-icons";
  import AppLoading from "expo-app-loading";
  import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
//   import EntradaConceptos from "./componentes/EntradaConceptos";
//   import Cab24 from "./componentes/Cab24";
  
  const Observaciones = (props) => {
    const folio = props.route.params.folio;
    const [observacion, setObservacion] = useState('');
    const [messages, setMessages] = useState(new Array());
    const [cant, setCant] = useState(0);


    agregarMensaje = () => {
        messages.push({
          keyMensaje: cant,
          mensaje: observacion,
        });
        // console.log(messages);
        let send = cant + 1;
        setCant(send);
        setObservacion('');
      };

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
            style={[styles.contenedorPrincipal]}
        >
            <ScrollView style={styles.chatScrollView} contentContainerStyle={styles.chat}>
                    <SafeAreaView style={{flex:1}}>
                        <View style={{ flexDirection: 'column', 
                            height: '100%', 
                            //    backgroundColor:'red', 
                            flex: 1,
                            justifyContent: 'flex-end'
                            }}>
                            <FlatList
                                // ListEmptyComponent={null}
                                data={messages}
                                // ListHeaderComponent={() => ( )}
                                // ListFooterComponent={() => ()}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', paddingRight: 2 }}>
                                        <View style={styles.burbujaDeChat}>
                                            <Text style={{ alignSelf: "flex-end", textAlign: "justify" }}>
                                                {item.mensaje}
                                            </Text>
                                        </View>
                                        <View style={styles.burbujaUsuario}>
                                            <Iconos
                                                name="usuario"
                                                size={40}
                                                style={{ alignSelf: "center", paddingLeft: 1 }}
                                            ></Iconos>
                                        </View>
                                  </View>
                                )}
                                keyExtractor={(item) => item.keyMensaje}
                            ></FlatList>
                        </View>
                    </SafeAreaView>
            </ScrollView>
            <View style={styles.containerInputMensajeria}>
                <AutoGrowingTextInput 
                    style={styles.inputCustomizedInfo} 
                    placeholder='Escribe Observación' 
                    value={observacion}
                    onChangeText={(observacion)=>setObservacion(observacion)}
                    // onChange={(()=>{ 
                    //     setObservacion(observacion);
                    // })}
                    selectionColor="#2166E5"
                ></AutoGrowingTextInput>
                <Pressable 
                    style={ styles.contenedorBoton }
                    onPress={ ()=>{
                        agregarMensaje();
                    }}
                >
                    <Ionicons name="md-send" size={24} color="black" />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
  };
  
  export default Observaciones;
  
  const styles = StyleSheet.create({
    contenedorPrincipal: {
        backgroundColor: "white",
        width: "100%",
        alignItems: 'center',
        paddingTop: 20,
        // paddingBottom: '10%',
    },
    chatScrollView: {
        width: '85%', 
        height:'80%',
    },
    chat:{
        flexGrow: 1,
        // height:'80%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        width: '100%',
        // flexDirection: 'column-reverse'
      },
      containerInputMensajeria: {
        width: '85%',
        height: '20%',
        alignItems: 'flex-end',
        // marginTop: -10,
        paddingBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row'
      },
      burbujaDeChat: {
        maxWidth: '80%', 
        height: 'auto',  
        elevation: 3, 
        backgroundColor: 'white', 
        padding: 20, 
        marginTop: 10,
        marginBottom: '1%',
        borderRadius: 10,
        shadowRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.4)',
        // borderColor: 'rgba(240, 240, 240, 0.5)',
        borderTopColor: 'rgba(240, 240, 240, 0.5)',
        borderBottomColor: 'transparent',
        borderLeftColor: 'rgba(240, 240, 240, 0.5)',
        borderRightColor: 'rgba(240, 240, 240, 0.5)', 
        borderWidth: 1
      },
      burbujaUsuario: {
        width: '20%',
        elevation: 3,
        width: 40,
        height: 40,
        borderRadius: 50,
        marginBottom: '1%',
        marginLeft: '5%',
        backgroundColor: 'white',
        justifyContent: "center",
        alignSelf: 'flex-end'
      },
      inputCustomizedInfo: {
        width: '90%',
        // height: 40,
        fontSize: 16,
        backgroundColor: 'rgba(237, 242, 249, 1)',
        borderRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        color: 'black',
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 10,
        paddingBottom: 10,
        // textDecorationLine: 'none',
        textAlignVertical: 'center',
        textAlign: 'justify'
      },
      contenedorBoton: {
        width: '10%', 
        // height: '80%',
        marginLeft: '5%',
        alignItems: 'center', 
        // alignContent: 'center', 
        marginBottom: '2%', 
        // backgroundColor: 'red', 
        justifyContent: "center",
        paddingVertical: 4
      },
  });
  