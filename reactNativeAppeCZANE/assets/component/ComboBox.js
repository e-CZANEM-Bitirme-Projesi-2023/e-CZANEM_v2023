import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import getRequest from "../component/getRequest";
//
//gelen medicineP id stok bilgisinde aranacak stok olanlar ekrana basilacak
//eger comboboxdan herhangi biri secilmediyse bu sefer sepete eklenemeyecekk

const ComboBoxEczaneler = ({ medicineId, setSelected, isEnabledCombo}) => {
  const [selectedLanguage, setSelectedPharmacy] = useState();
  const [eczaneler, setEczaneler] = useState();

  const eczaneVerileri = [
    { label: "Eczane 1", value: "1" },
    { label: "Eczane 2", value: "2" },
    { label: "Eczane 3", value: "3" },
    { label: "Eczane 4", value: "4" },
    // Diğer eczaneler buraya eklenebilir
  ];

  useEffect(() => {
    getData(medicineId)
      .then((data) => setEczaneler(data))
      .catch((error) => {
        alert(error);
      });
  }, []);

  async function getData(id) {
    try {
      let url =
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getEczane?id=" +
        id;
      const value = await getRequest(url);
      // console.log(value);
      return value != null ? value : [];
    } catch (e) {
      alert(e);
    }
  }

  return (
    <Picker
      enabled={isEnabledCombo}
      mode="dialog"
      selectedValue={selectedLanguage}
      onValueChange={(itemValue, itemIndex) => {
        setSelectedPharmacy(itemValue);
        setSelected(itemValue);
      }}
    >
      <Picker.Item enabled={false} label="Eczane Seçiniz" value="FirstLoad" />
      {eczaneler?.length > 0 &&
        eczaneler.map((eczane, index) => (
          <Picker.Item
            key={index}
            label={eczane.isim}
            value={eczane.eczaneid}
          />
        ))}
    </Picker>
  );
};

export default ComboBoxEczaneler;
