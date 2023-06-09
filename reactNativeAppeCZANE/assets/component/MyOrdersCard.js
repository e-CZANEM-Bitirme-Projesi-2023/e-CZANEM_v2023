import React, { useState, useEffect } from "react";
import {  StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProductDeliveryStatus = ({ delivered }) => {
  return (
      delivered ? 'Teslim Edildi' : 'Teslim Edilmedi'
  );
};

export default function MyOrdersCard({navigation, route, params }) {
  const [adress, setAdress] = useState(params.item.adress);
  const [medicines, setMedicines] = useState(params.item.medicines);
  const [orderid, setOrderid] = useState(params.item.orderid);
  const [orderType, setOrderType] = useState(params.item.ordertype);
  const [userid, setUserId] = useState(params.item.userid);
  const [date, setDate] = useState(params.item.date);
  const [status, setStatus] = useState(params.item.status);
  const [totalPrice, setTotalPrice] = useState(toplam());

  function toplam()
  {
    let result = 0;
    medicines.forEach((element) => {
      result = result + parseFloat(element.price) * element.count;
    })
    return result.toFixed(2);
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.orderNumber}>Sipariş Numarası: {orderid}</Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>Sipariş Tarihi: <Text style={styles.date}>{date}</Text> </Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>
        Adres: <Text style={styles.date}>{adress}</Text>
      </Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>Sipariş Toplamı: <Text style={styles.date}>{totalPrice}</Text></Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>
        Sipariş Durumu: <Text style={styles.date}>{status}</Text>
      </Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>
        Ödeme Yöntemi: <Text style={styles.date}>{orderType}</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
           navigation.push("SparislerimEkrani", [medicines,totalPrice]);
        }}>
          <Text style={styles.buttonText}>Ürünleri Gör</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: '#a1c198',
      padding: 10,
      marginTop:10,
      marginBottom: 15,
      marginEnd:10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    orderNumber: {
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#fefff3',
      fontSize:18,
    },
    date: {
      fontStyle: 'italic',
      marginBottom: 4,
      color: '#fefff3',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      marginTop: 12,
      borderTopColor: 'rgba(255, 255, 255, 0.5)',
  
    },
    button: {
      backgroundColor: '#e08e41',
      marginTop: 20,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginLeft:175,
    },
    buttonText: {
      color: '#fefff3',
      fontWeight: 'bold',
    },
  });
