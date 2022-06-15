import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import { useState, useEffect } from "react";
import { TextInput } from "react-native-paper";
import { useFonts as Fuentes } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../database/firebase";
import { async } from "@firebase/util";
import Toast from 'react-native-root-toast';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, NavigationAction } from '@react-navigation/native';
import { NavigationActions } from 'react-navigation';

const LoginForm = (props) => {
  const [email, setText] = useState("");
  const [passVisibility, setBool] = useState(true);
  const [pass, setPass] = useState("");
  const [desplegar, setDespliegue] = useState(true);
  const [errorPass, setErrorPass] = useState('transparent');
  const [errorCorreo, setErrorCorreo] = useState('transparent');

  const navigation = useNavigation();

  const validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    }
    else {
      return true;
    }
  }

  const showToast = (message) =>{
    // ToastAndroid.show(message, ToastAndroid.SHORT, styles.tostada);
    let toast = Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: -30,
        // marginBottom: 15,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: '#BE0618',
        borderRadius: 30,
        fontSize: 14,
        textColor: 'white',
        fontWeight: 'bold',
        onShow: () => {
            // calls on toast\`s appear animation start
        },
        onShown: () => {
            // calls on toast\`s appear animation end.
        },
        onHide: () => {
            // calls on toast\`s hide animation start.
        },
        onHidden: () => {
            // setErrorColor('transparent');
        }
    });
    
    // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
    setTimeout(function () {
        Toast.hide(toast);
    }, 1200);
    clearTimeout();
  }

  const iniciarSesion = async (datos) => {
    if (datos.email == '' || datos.pass == '') {
        setTimeout(() => {
            setDespliegue(true);
            showToast('Favor de completar todos los campos');
        }, 2000); 
      clearTimeout();
    }else{
        let regexp = validate(datos.email);
        if (regexp) {
            signInWithEmailAndPassword(auth, datos.email, datos.pass)
            .then((userCredentials) => {
              navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Sidebar",
                      // name: "Sidebar",
                      params: { user: userCredentials.user.displayName }
                    }
                  ]
                });
              })
            .catch((error) => {
                switch (error.code) {
                    case 'auth/wrong-password':
                        setTimeout(() => {
                            setDespliegue(true);
                            showToast('Campo(s) incorrecto(s), favor de verificar');
                        }, 2000); 
                        clearTimeout();
                        break;
                    case 'auth/user-not-found':
                        setTimeout(() => {
                          setDespliegue(true);
                          showToast('Campo(s) incorrecto(s), favor de verificar');
                        }, 2000); 
                      clearTimeout();
                      break;
                    default:
                        console.log(error);
                    break;
                }
            }); 
        }else{
            setTimeout(() => {
                setDespliegue(true);
                showToast('Correo ingresado no válido');
            }, 2000);  
          clearTimeout();
        }
    }
  };

  const Iconos = createIconSetFromIcoMoon(
    require("../../icons/selection.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [iconsLoaded] = Fuentes({
    IcoMoon: require("../../icons/icomoon.ttf"),
  });

  if (!iconsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={{ width: "90%", paddingBottom: 120 }}>
      <TextInput
        style={[styles.inputs, styles.inputCorreo]}
        //   label="Email"
        left={
          <TextInput.Icon
            name={() => <Iconos name="usuario" size={35} />}
            style={styles.iconos}
            color="black"
          />
        }
        value={email}
        onChangeText={(email) => setText(email)}
        placeholder="Correo"
        keyboardType="email-address"
        underlineColor={errorCorreo}
        autoFocus={false}
        activeUnderlineColor="rgba(33, 102, 229, 0.5)"    
        // onFocus={() => setErrorCorreo('transparent')}    
        />
      <TextInput
        style={[styles.inputs]}
        left={
          <TextInput.Icon
            name={() => <Iconos name="contrasenia" size={35} />}
            style={styles.iconos}
            />
        }
        right={
            <TextInput.Icon
            name="eye"
            style={styles.iconos}
            onPress={() => setBool(passVisibility == true ? false : true)}
            />
        }
        placeholder="Contraseña"
        underlineColor={errorPass}
        autoFocus={false}
        activeUnderlineColor="rgba(33, 102, 229, 0.5)"
        secureTextEntry={passVisibility}
        onChangeText={(pass) => setPass(pass)}
        value={pass}
        // onFocus={() => setErrorPass('transparent') }
        />
      <View style={[styles.buttonContainer]}>
        <ActivityIndicator
          size="large"
          color="#2166E5"
          animating={!desplegar}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { display: desplegar == true ? "flex" : "none" },
          ]}
          onPress={async () => {
            setDespliegue(false);
            await iniciarSesion({ pass, email });
          }}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputs: {
    width: "100%",
    height: 25,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "rgba(249, 249, 249, 0.5)",
    color: "rgb(0, 0, 0)",
    borderTopWidth: 6,
    borderTopColor: "rgba(200, 200, 200, 0.2)",
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // fontWeight: "bold",
    fontFamily: "Urbanist_400Regular",
  },
  inputCorreo: {
    marginBottom: 35,
  },
  iconos: {
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "100%",
    color: "black",
    shadowOpacity: 0.2,
  },
  buttonContainer: {
    width: "60%",
    // height: 40,
    flex: 1,
    marginTop: "40%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#2166E5",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    height: 45,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    letterSpacing: 2,
    fontWeight: "bold",
  },
});
