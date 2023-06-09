import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { numberValidator } from "../helpers/numberValidator";
import axios from "axios";
import { Alert } from "react-native";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [number, setNumber] = useState({ value: "", error: "" });

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const numberError = numberValidator(number.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setNumber({ ...number, error: numberError });
      return;
    } else {
      var resultFromDb = await postRequestAdd();
      if (resultFromDb != undefined && resultFromDb.status_code =="200") {
        Alert.alert('Bilgilendirme', 'Kullanıcı Kaydedildi, İşlem Başarılı !', [{ text: 'Tamam' }]);
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        });
      }
      else{ Alert.alert('Uyarı', 'Kullanıcı Kaydedilmedi, Bilgilerinizi Kontrol Ediniz !', [{ text: 'Tekrar Dene' }]);}
    }
  };
  async function postRequestAdd() {
    try {
      const postData = {
        email: email.value,
        password: password.value,
        phonenumber: number.value,
        name: name.value.split(" ").filter(Boolean)[0],
        surname: name.value.split(" ").filter(Boolean)[1],
      };
      const response = await axios.post(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/addNewUsers",
        postData
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Kayıt Ol</Header>
      <TextInput
        style={{ marginTop: -5 }}
        label="Ad-Soyad"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        style={{ marginTop: -5 }}
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        style={{ marginTop: -5 }}
        label="Telefon Numarası"
        returnKeyType="next"
        value={number.value}
        onChangeText={(text) => setNumber({ value: text, error: "" })}
        error={!!number.error}
        errorText={number.error}
        autoCapitalize="none"
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        maxLength={11}
      />
      <TextInput
        style={{ marginTop: -5 }}
        label="Parola"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        maxLength={8}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Kayıt Ol
      </Button>
      <View style={styles.row}>
        <Text>Hesabın var mı? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 6,
  },
  link: {
    fontWeight: "bold",
    color: "#79A66D",
  },
});
