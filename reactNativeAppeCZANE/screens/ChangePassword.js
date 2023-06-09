import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import "../assets/globals/priceBasket";
import axios from "axios";


const ChangePassword = ({ navigation, routes }) => {
  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState([
    { label: "Eski şifrenizi giriniz*", value: "" },
    { label: "Eski şifrenizi tekrar giriniz*", value: "" },
    { label: "Yeni şifrenizi giriniz*", value: "" },
  ]);

  const handleChangeText = (text, index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].value = text;
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    const validateForm = () => {
      for (const item of formData) {
        if (item.value != "") {
          return true;
        }
        else{ return false;}
      }
    };

    setFormError(false);

    if (!validateForm()) {
      setFormError(true);
    } else {
      var resultFromDb = await postRequestAdd();
      if (resultFromDb == null)
      {
        Alert.alert("Başarısız", "Kullanıcı Bulunamadı! , Bilgilerinizi Kontrol Ediniz !", [
          { text: "Tekrar Dene" },
        ]);
      }
      if (resultFromDb != undefined && resultFromDb == 200) {
        Alert.alert("Başarılı", "Şifreniz başarıyla değiştirildi.", [
          { text: "Tamam" },
        ]);
      }
     //else{ Alert.alert('Uyarı', 'Şifre Güncellenemedi, Bilgilerinizi Kontrol Ediniz !', [{ text: 'Tekrar Dene' }]);}
    }
  };

  async function postRequestAdd() {
    try {
      const postData = {
        userid: global.userid,
        oldPass: formData[0].value, //textboxdan cek
        newPass: formData[2].value, //textboxdan gelecek
        email: global.email
      };
      const response = await axios.post(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/updatePassword",
        postData
      );
      return response.status;
    } catch (error) {
      return null;
    }
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{item.label}</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          maxLength={8}
          value={item.value}
          onChangeText={(text) => handleChangeText(text, index)}
          secureTextEntry
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={formData}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
        style={styles.formContainer}
      />
      {formError && (
        <Text style={styles.error}>
          Lütfen gerekli alanları uygun şekilde doldurunuz!
        </Text>
      )}
      <TouchableOpacity style={styles.buttonPasswd} onPress={handleSubmit}>
        <Text style={styles.buttonPasswd}>Şifreyi Değiştir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: -20,
    marginBottom: 0,
    backgroundColor: "white",
  },
  buttonPasswd: {
    backgroundColor: "#fea11e",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 10,
    padding: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#b63e3f",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 0.5,
    borderColor: "#7ac594",
    borderRadius: 4,
    padding: 5,
    color: "#fea11e",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default ChangePassword;
