import React from "react";
import { StyleSheet } from 'react-native'
import { TextInput } from "react-native-paper";
// import { createIconSetFromIcoMoon } from '@expo/vector-icons';
// import { useFonts } from 'expo-font';

// const Iconos = createIconSetFromIcoMoon(
//     require('../../icons/selection.json'),
//     'IcoMoon',
//     'icomoon.ttf'
//   );

class Contrasenia extends React.Component {
  constructor() {
    super();
    this.state = {
      pass: "",
      passVisibility: true,
    };
  }

  handleText = (text) => {
    this.setState({ pass: text });
  };

  render() {
    // const [fontsLoaded] = useFonts({ IcoMoon: require('../../icons/icomoon.ttf') });
    //     if (!fontsLoaded) {
    //             return <AppLoading/>;
    //       }
    return (
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
            onPress={() => {
              this.setState({
                passVisibility:
                  this.state.passVisibility == true ? false : true,
              });
            }}
          />
        }
        placeholder="Contraseña"
        underlineColor="transparent"
        autoFocus={false}
        activeUnderlineColor="rgba(33, 102, 229, 0.5)"
        secureTextEntry={this.state.passVisibility}
        onChangeText={(text) => this.handleText(text)}
        value={this.state.pass}
      ></TextInput>
    );
  }
}

    export default Contrasenia;

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
    borderTopColor: 'rgba(200, 200, 200, 0.2)',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    fontFamily: 'Urbanist_400Regular'
  },
  inputCorreo: {
    marginBottom: 35,
  },
  iconos: {
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "100%",
    color: 'black'
  }
});
