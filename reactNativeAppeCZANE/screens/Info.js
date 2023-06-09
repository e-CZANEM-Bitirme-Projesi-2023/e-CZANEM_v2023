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
import { Picker } from "@react-native-picker/picker";
import { Alert } from "react-native";
import axios from "axios";

const countries = [
  {
    label: "Türkiye",
    cities: [
      "Adana",
      "Adıyaman",
      "Afyonkarahisar",
      "Ağrı",
      "Aksaray",
      "Amasya",
      "Ankara",
      "Antalya",
      "Ardahan",
      "Artvin",
      "Aydın",
      "Balıkesir",
      "Bartın",
      "Batman",
      "Bayburt",
      "Bilecik",
      "Bingöl",
      "Bitlis",
      "Bolu",
      "Burdur",
      "Bursa",
      "Çanakkale",
      "Çankırı",
      "Çorum",
      "Denizli",
      "Diyarbakır",
      "Düzce",
      "Edirne",
      "Elazığ",
      "Erzincan",
      "Erzurum",
      "Eskişehir",
      "Gaziantep",
      "Giresun",
      "Gümüşhane",
      "Hakkari",
      "Hatay",
      "Iğdır",
      "Isparta",
      "İstanbul",
      "İzmir",
      "Kahramanmaraş",
      "Karabük",
      "Karaman",
      "Kars",
      "Kastamonu",
      "Kayseri",
      "Kırıkkale",
      "Kırklareli",
      "Kırşehir",
      "Kilis",
      "Kocaeli",
      "Konya",
      "Kütahya",
      "Malatya",
      "Manisa",
      "Mardin",
      "Mersin",
      "Muğla",
      "Muş",
      "Nevşehir",
      "Niğde",
      "Ordu",
      "Osmaniye",
      "Rize",
      "Sakarya",
      "Samsun",
      "Şanlıurfa",
      "Siirt",
      "Sinop",
      "Sivas",
      "Şırnak",
      "Tekirdağ",
      "Tokat",
      "Trabzon",
      "Tunceli",
      "Uşak",
      "Van",
      "Yalova",
      "Yozgat",
      "Zonguldak",
    ],
  },
  { label: "Almanya", cities: ["Berlin", "Hamburg", "Münih", "Köln"] },
  { label: "Fransa", cities: ["Paris", "Marsilya", "Lyon", "Toulouse"] },
  // Diğer ülkeler...
];

const Info = ({ navigation, routes }) => {
  const [selectedCountry, setSelectedCountry] = useState(global.ulke);
  const [selectedCity, setSelectedCity] = useState("");
  const [formError, setFormError] = useState(false);

  const handleCountryChange = (field, value) => {
    setSelectedCountry(value);
    setSelectedCity("");
    setFormData((prevFormData) => {
      let updatedFormData = [...prevFormData];
      updatedFormData[6].value[field] = value;
      return updatedFormData;
    });
  };

  const handleCityChange = (field, value) => {
    setSelectedCity(value);
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      updatedFormData[7].value[field] = value;
      return updatedFormData;
    });
  };

  let [formData, setFormData] = useState([
    { label: "Ad - Soyad", value: global.name + " " + global.surname },
    {
      label: "Telefon Numarası (11 Haneli Giriniz)",
      value: global.phonenumber,
    },
    { label: "E-posta", value: global.email },
    {
      label: "Önemli Hastalıklar (Yoksa Boş Bırakınız)",
      value: global.hastaliklar,
    },
    { label: "Açık Adres", value: global.adress },
    {
      label: "Doğum Tarihi",
      value: { day: global.gun, month: global.ay, year: global.yil },
    },
    { label: "Ülke", value: { country: global.ulke } },
    { label: "Şehir", value: { city: global.sehir } }, // ulke ve sehir ayriyeten gelsin
  ]);
  async function postRequestUpdate() {
    try {
      const postData = {
        id: global.userid,
        name: formData[0].value.split(" ")[0],
        surname: formData[0].value.split(" ")[1],
        phonenumber: formData[1].value,
        email: formData[2].value,
        hastaliklar: formData[3].value,
        address: formData[4].value,
        bdate:
          formData[5].value.day +
          "/" +
          formData[5].value.month +
          "/" +
          formData[5].value.year,
        candc: formData[7].value.city + "/" + formData[6].value.country,
      };
      const response = await axios.post(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/updateUserInfo",
        postData
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  const handleChangeText = (text, index) => {
    let updatedFormData = [...formData];
    updatedFormData[index].value = text;
    setFormData(updatedFormData);
  };

  const handleDateChange = (field, value) => {
    let updatedFormData = [...formData];
    updatedFormData[5].value[field] = value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    let validateForm = () => {
      for (let item of formData) {
        if (
          item.label != "Şehir" &&
          item.label != "Ülke" &&
          item.label != "Doğum Tarihi" &&
          item.label != "Önemli Hastalıklar (Yoksa Boş Bırakınız)"
        ) {
          if (!item.value || item.value.length < 5) {
            return false;
          }
        }
        return true;
      }

      setFormError(false);

      if (!validateForm()) {
        setFormError(true);
      } else {
        let phoneNumber = formData.find(
          (item) => item.label === "Telefon Numarası (11 Haneli Giriniz)"
        ).value;
        if (!validatePhoneNumber(phoneNumber)) {
          setFormError(true);
          return;
        }

        let email = formData.find((item) => item.label === "E-posta").value;
        if (!validateEmail(email)) {
          setFormError(true);
          return;
        }
      }
      // Submit form data
      console.log(formData);
    };
    //Db Gonderme Asamasi
    var resultFromDb = await postRequestUpdate();
    if (resultFromDb != undefined && resultFromDb.status_code == "200") {
      Alert.alert(
        "Bilgilendirme",
        "Kullanıcı Bilgileri Güncellendi, İşlem Başarılı !",
        [{ text: "Tamam" }]
      );
      //globalleri degistirme zamani
      global.name = formData[0].value.split(" ")[0];
      global.surname = formData[0].value.split(" ")[1];
      global.phonenumber = formData[1].value;
      global.email = formData[2].value;
      global.hastaliklar = formData[3].value;
      global.adress = formData[4].value;
      global.gun = formData[5].value.day;
      global.ay = formData[5].value.month;
      global.yil = formData[5].value.year;
      global.ulke = formData[6].value.country;
      global.sehir = formData[7].value.city;
    } else {
      Alert.alert(
        "Uyarı",
        "Kullanıcı Bilgileri Güncellenemedi, Bilgilerinizi Kontrol Ediniz !",
        [{ text: "Tekrar Dene" }]
      );
    }
  };

  const validateEmail = (email) => {
    // Regex pattern for email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    // Regex pattern for 11-digit phone number
    let phonePattern = /^\d{11}$/;
    return phonePattern.test(phoneNumber);
  };

  const renderItem = ({ item, index }) => {
    if (item.label === "Doğum Tarihi") {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.datePickerContainer}>
            <Picker
              style={styles.datePicker}
              selectedValue={item.value.day}
              onValueChange={(value) => handleDateChange("day", value)}
            >
              <Picker.Item label="Gün" value="" />
              {/* Gün seçenekleri */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <Picker.Item
                  key={day}
                  label={day.toString()}
                  value={day.toString()}
                />
              ))}
            </Picker>
            <Picker
              style={styles.datePicker}
              selectedValue={item.value.month}
              onValueChange={(value) => handleDateChange("month", value)}
            >
              <Picker.Item label="Ay" value="" />
              {/* Ay seçenekleri */}
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <Picker.Item
                  key={month}
                  label={month.toString()}
                  value={month.toString()}
                />
              ))}
            </Picker>
            <Picker
              style={styles.datePicker}
              selectedValue={item.value.year}
              onValueChange={(value) => handleDateChange("year", value)}
            >
              <Picker.Item label="Yıl" value="" />
              {/* Yıl seçenekleri */}
              {Array.from({ length: 100 }, (_, i) => 2023 - i).map((year) => (
                <Picker.Item
                  key={year}
                  label={year.toString()}
                  value={year.toString()}
                />
              ))}
            </Picker>
          </View>
        </View>
      );
    } else if (item.label === "Ülke") {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <Picker
            style={styles.input}
            selectedValue={item.value.country}
            onValueChange={(value) => handleCountryChange("country", value)}
          >
            <Picker.Item label="Ülke seçiniz" value="" />
            {countries.map((country) => (
              <Picker.Item
                key={country.label}
                label={country.label}
                value={country.label}
              />
            ))}
          </Picker>
        </View>
      );
    } else if (item.label === "Şehir") {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <Picker
            style={styles.input}
            selectedValue={item.value.city}
            onValueChange={(value) => handleCityChange("city", value)}
            enabled={!!selectedCountry}
          >
            <Picker.Item label="Şehir seçiniz" value="" />
            {selectedCountry
              ? countries
                  .find((country) => country.label === selectedCountry)
                  .cities.map((city) => (
                    <Picker.Item key={city} label={city} value={city} />
                  ))
              : null}
          </Picker>
        </View>
      );
    } else if (item.label === "Telefon Numarası (11 Haneli Giriniz)") {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={item.value}
            onChangeText={(text) => handleChangeText(text, index)}
            maxLength={11}
            keyboardType={"number-pad"}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{item.label}</Text>
          <TextInput
            style={styles.input}
            value={item.value}
            onChangeText={(text) => handleChangeText(text, index)}
          />
        </View>
      );
    }
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

      <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
        <Text style={styles.buttonUpdate}>Bilgileri Güncelle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: -20,
    marginBottom: 0,
    backgroundColor: "white",
  },
  buttonUpdate: {
    backgroundColor: "#5bb679",
    borderRadius: 5,
    padding: 3,
    margin: 5,
    textAlign: "center",
    fontSize: 15,
    color: "white",
  },
  buttonPasswd: {
    backgroundColor: "#fea11e",
    borderRadius: 5,
    padding: 3,
    margin: 5,
    textAlign: "center",
    fontSize: 15,
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
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: -19,
  },
  datePicker: {
    flex: 1,
    margin: 1,
    color: "#fea11e",
    fontWeight: "condensed",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Info;
