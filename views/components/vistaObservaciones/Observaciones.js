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
  Pressable,
  SafeAreaViewComponent,
  BackHandler,
  keyboard
} from "react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { Ionicons } from "@expo/vector-icons";
//   import { TextInput } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { useFonts as Fuentes } from "expo-font";
import { useState, useRef, useContext, useCallback, useEffect } from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { useFonts, Urbanist_400Regular } from "@expo-google-fonts/urbanist";
import { getAuth } from "firebase/auth";
import { getDatabase, child, get, ref, set, push } from "firebase/database";

const Observaciones = (props) => {
  const folio = props.route.params.folio;
  const tipoFolio = props.route.params.tipoFolio;
  const [observacion, setObservacion] = useState("");
  const [messages, setMessages] = useState(new Array());
  const [cant, setCant] = useState(0);
  const [bgcolor, setBgcolor] = useState(new Array());
  const [seleccionados, setSeleccionados] = useState(0);

  const pressableRef = useRef(null);

  const db = getDatabase();
  const auth = getAuth();

  BackHandler.addEventListener("hardwareBackPress", function () {
    if (seleccionados !== 0) {
      setSeleccionados(0);
      let temp = new Array();
      bgcolor.forEach((elements) => {
        temp.push("transparent");
      });
      setBgcolor(temp);
    }
    return true;
  });

  // keyboard.addL

  const agregarMensaje = async () => {
    const postListRef = ref(
      db,
      `folios/correctivos/${tipoFolio}/${folio}/observaciones`
    );
    const newPostRef = push(postListRef);
    set(newPostRef, {
      observacion,
    });

    let arrayId = newPostRef.toString().split("/");
    let llave = arrayId[arrayId.length - 1];

    bgcolor.push("transparent");

    return { llave, observacion };
  };

  const cargarMensajes = useCallback(async () => {
    // let i = 0;
    let consulta1 = await get(
      child(
        ref(db),
        `folios/correctivos/${tipoFolio}/${folio}/observaciones`
      )
    )
      .then((snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((element) => {
          // messages.push({
          //   keyMensaje: element.key,
          //   mensaje: element.val().observacion,
          // });
          setMessages((messages) => [
            ...messages,
            {
              keyMensaje: element.key,
              mensaje: element.val().observacion,
            },
          ]);

          bgcolor.push("transparent");
        });
      })
      .catch(function (err) {});
    // setCantidad(i);
    // console.log("Nueva cantidad: " + cantidad.toString());
    // console.log(messages);
  });

  useEffect(() => {
    cargarMensajes();
  }, []);

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
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior="position"
      // keyboardVerticalOffset={160}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : -340}
      style={[styles.contenedorPrincipal]}
    >
      <Iconos 
        name={'borrar'} 
        color={'white'} 
        size={40} 
        style={[styles.botonEliminar, {display: seleccionados > 0 ? 'flex' : 'none'}]}
        onPress={()=>{
          // console.log('Eliminando...');
          let i = 0;
          let bgcolorTemp = new Array();
          let messagesTemp = new Array();

          messages.forEach((element)=>{
            if(bgcolor[i] === 'transparent'){
              messagesTemp.push({
                keyMensaje: element.keyMensaje,
                mensaje: element.mensaje,
              });
              bgcolorTemp.push('transparent');
              // console.log(messages);
            }else{
              set(
                child(
                ref(db),
                `folios/correctivos/${tipoFolio}/${folio}/observaciones/${element.keyMensaje}`
                ),
                null
              );
            }
            i = i + 1;
          });
          setMessages(messagesTemp);
          setBgcolor(bgcolorTemp);
          setSeleccionados(0);
        }}
      ></Iconos>
      <ScrollView
        style={styles.chatScrollView}
        contentContainerStyle={styles.chat}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "column",
              height: "100%",
              //    backgroundColor:'red',
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <FlatList
              data={messages}
              refreshing={true}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index.toString()}
                  style={{
                    width: "100%",
                    marginVertical: 5,
                    // marginRight: 3,
                    backgroundColor: bgcolor[index],
                  }}
                  onLongPress={() => {
                    if (pressableRef) {
                      let i = 0;
                      let temp = new Array();
                      bgcolor.forEach((element) => {
                        if (i == index) {
                          temp.push("rgba(123, 180, 227, 0.6)");
                        } else {
                          temp.push(element);
                        }
                        i = i + 1;
                      });
                      setBgcolor(temp);
                      setSeleccionados(seleccionados + 1);
                    }
                  }}
                  onPress={() => {
                    if (seleccionados > 0) {
                      let i = 0;
                      let temp = new Array();
                      bgcolor.forEach((element) => {
                        if (i == index) {
                          if (element === "transparent") {
                            temp.push("rgba(123, 180, 227, 0.6)");
                            setSeleccionados(seleccionados + 1);
                          } else {
                            temp.push("transparent");
                            setSeleccionados(seleccionados - 1);
                          }
                        } else {
                          temp.push(element);
                        }
                        i = i + 1;
                      });
                      setBgcolor(temp);
                    } else {
                      if (bgcolor.includes("rgba(123, 180, 227, 0.6)")) {
                        let i = 0;
                        let temp = new Array();
                        bgcolor.forEach((element) => {
                          if (i == index) {
                            if (element === "rgba(123, 180, 227, 0.6)") {
                              temp.push("transparent");
                            }
                          } else {
                            temp.push(element);
                          }
                          i = i + 1;
                        });
                        setBgcolor(temp);
                      }
                    }
                  }}
                  ref={pressableRef}
                >
                  <View style={styles.contenedorMensajes}>
                    <View style={styles.burbujaDeChat}>
                      <Text
                        style={{ alignSelf: "flex-end", textAlign: "justify" }}
                      >
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
                </Pressable>
              )}
              keyExtractor={(item) => item.keyMensaje}
            ></FlatList>
          </View>
        </SafeAreaView>
      </ScrollView>
      <View style={styles.containerInputMensajeria}>
        <AutoGrowingTextInput
          style={styles.inputCustomizedInfo}
          placeholder="Escribe Observación"
          value={observacion}
          onChangeText={(observacion) => setObservacion(observacion)}
          maxHeight={200}
          minHeight={45}
          enableScrollToCaret
          selectionColor="grey"
        ></AutoGrowingTextInput>
        <Pressable
          style={styles.contenedorBoton}
          onPress={async () => {
            let agregado = await agregarMensaje();
            // console.log(agregado);
            setObservacion("");

            let temp = new Array();
            messages.forEach((element) => {
              temp.push({
                keyMensaje: element.keyMensaje,
                mensaje: element.mensaje,
              });
            });
            temp.push({
              keyMensaje: agregado.llave,
              mensaje: agregado.observacion,
            });
            // console.log(messages);
            setMessages(temp);
            // setMessages(agregado);
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
    height: "100%",
    alignItems: "center",
    paddingTop: 20,
    // paddingBottom: '10%',
  },
  contenedorMensajes: {
    flexDirection: "row",
    justifyContent: "flex-end",
    // paddingRight: 2,
    paddingBottom: 5,
    width: "100%",
    paddingEnd: 10
  },
  botonEliminar: {
    alignSelf: 'flex-end', 
    marginRight: 30, 
    backgroundColor: 'red',
    borderRadius: 50,
    paddingVertical: 2
  },
  chatScrollView: {
    width: "85%",
    height: "80%",
  },
  chat: {
    flexGrow: 1,
    // height:'80%',
    alignItems: "flex-end",
    alignSelf: "flex-end",
    width: "100%",
    // marginRight: 5
    // flexDirection: 'column-reverse'
  },
  containerInputMensajeria: {
    width: "85%",
    height: "20%",
    alignItems: "flex-end",
    // marginTop: -10,
    paddingBottom: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  burbujaDeChat: {
    maxWidth: "80%",
    height: "auto",
    elevation: 3,
    backgroundColor: "white",
    padding: 20,
    marginTop: 10,
    marginBottom: "1%",
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    // borderColor: 'rgba(240, 240, 240, 0.5)',
    borderTopColor: "rgba(240, 240, 240, 0.5)",
    borderBottomColor: "transparent",
    borderLeftColor: "rgba(240, 240, 240, 0.5)",
    borderRightColor: "rgba(240, 240, 240, 0.5)",
    borderWidth: 1,
  },
  burbujaUsuario: {
    width: "20%",
    elevation: 3,
    width: 40,
    height: 40,
    borderRadius: 50,
    marginBottom: "1%",
    marginLeft: "5%",
    backgroundColor: "white",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  inputCustomizedInfo: {
    width: "90%",
    // height: 40,
    fontSize: 16,
    backgroundColor: "rgba(237, 242, 249, 1)",
    borderRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    color: "black",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    // paddingEnd: 10,
    // paddingStart: 10,
    // textDecorationLine: 'none',
    textAlignVertical: "center",
    textAlign: "justify",
  },
  contenedorBoton: {
    width: "10%",
    // height: '80%',
    marginLeft: "5%",
    alignItems: "center",
    // alignContent: 'center',
    marginBottom: "2%",
    // backgroundColor: 'red',
    justifyContent: "center",
    paddingVertical: 4,
  },
});
