import React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import getRequest from "./getRequest";

export default function KuryeCard({ params }) {
  const [currDelivered, setCurrDelivered] = useState(JSON.parse(params.item.teslimdurumu));
  const [ordersDB, setOrdersDB] = useState();
  const [userName, setUserName] = useState("");
  const [pname,setPname] = useState();

  const fetchOrdersInfo = async () => {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getInfoKuryeCardFromOrderId?orderid=" +
      params.item.orderid;
    const getOrders = await getRequest(url);
    if (getOrders) {
      setOrdersDB(getOrders);
      return getOrders;
    }
  };
  const fetchNameInfo = async (userid) => {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getUserNameFromUserId?userId=" +
      userid;
    const getUsername = await getRequest(url);
    if (getUsername) {
      setUserName(getUsername);
      return getUsername;
    }
  };

  useEffect(() => {
    //Ilk acildiginda istek at
    fetchOrdersInfo()
      .then((result) => fetchNameInfo(result.userid))
      .catch((error) => {
        alert(error);
      });
      getPharmacyName(params.item.eczaneid).catch((error) => {alert(error)});
  }, []);

  const handleOpenNavApp = (lat, long) => {
    console.log("Navigasyon Aciliyor...");
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
    Linking.openURL(url);
  };
  const handleCallPress = () => {
    const phoneNumber = ordersDB?.phonenumber;

    Linking.openURL(`tel:${phoneNumber}`).catch((error) =>
      console.log("Arama hatası:", error)
    );
  };
  async function updateStatus(_pkeys) {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/updateKuryeSiparisDurumu?pkeys=" +
      _pkeys;
    const updateStatus = await getRequest(url);
    if (updateStatus) {
      return true;
    }
    else
    {
      return false;
    }
  }
  async function getPharmacyName(_id) {
    let url =
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getPharmacyFromUserId?id=" +
      _id;
    const name = await getRequest(url);
    if (name) {
      setPname(name);
      return name;
    }
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.orderNumber}>
        Sipariş Numarası: {params.item.orderid}
      </Text>
      <Text style={[styles.date, { fontWeight: "bold" }]}>
        Eczane İsim: <Text style={styles.date}>{pname}</Text>{" "}
      </Text>
      <Text style={[styles.address, { fontWeight: "bold" }]}>
        Adres: <Text style={styles.date}>{ordersDB?.adress}</Text>
      </Text>
      <Text style={[styles.address, { fontWeight: "bold" }]}>
        Alıcı Ad-Soyad: <Text style={styles.date}>{userName}</Text>
      </Text>
      <Text style={[styles.date, { fontWeight: "bold" }]}>
        Telefon No: <Text style={styles.date}></Text>
        {ordersDB?.phonenumber}
      </Text>
      <Text style={[styles.date, { fontWeight: "bold" }]}>
        Sipariş Tarihi:{ordersDB?.date}
        <Text style={styles.date}>{params.item.orderDate}</Text>
      </Text>
      {/* <Text style={styles.date}>Sipariş Durumu: {currDelivered.toString()}</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addressButton}
          onPress={() =>
            handleOpenNavApp(
              parseFloat(params.item.eczanelat.replace(",", ".")),
              parseFloat(params.item.eczanelong.replace(",", "."))
            )
          }
        >
          <Text style={styles.buttonText}>Eczane Adres</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addressButton}
          onPress={() =>
            handleOpenNavApp(
              parseFloat(params.item.userlat.replace(",", ".")),
              parseFloat(params.item.userlong.replace(",", "."))
            )
          }
        >
          <Text style={styles.buttonText}>Müşteri Adres</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, currDelivered && styles.buttonDisabled]}
          onPress={async () => {           
            setCurrDelivered(await updateStatus(params.item.pkeys));
          }}
          disabled={currDelivered}
        >
          <Text
            style={[
              styles.buttonText,
              currDelivered && styles.buttonTextDisabled,
            ]}
          >
            {currDelivered ? "Teslim Edildi" : "Teslim Edilecek"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addressButton}
          onPress={handleCallPress}
        >
          <Text style={styles.buttonText}>Müşteriyi Ara</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  titleSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: "#fea11e",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#197A6C",
    marginBottom: 10,
    marginLeft: 3,
  },
  itemContainer: {
    backgroundColor: "#ffce45",
    padding: 16,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderNumber: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#a0461b",
    fontSize: 18,
  },
  address: {
    marginBottom: 4,
    color: "#a0461b",
  },
  date: {
    fontStyle: "italic",
    marginBottom: 4,
    color: "#a0461b",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    marginTop: 12,
    borderTopColor: "rgba(255, 255, 255, 0.5)",
  },
  button: {
    backgroundColor: "#fea11e",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addressButton: {
    backgroundColor: "#5ab779",
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fefff3",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#dbcfbf",
  },
  buttonTextDisabled: {
    color: "#242424",
  },
});
