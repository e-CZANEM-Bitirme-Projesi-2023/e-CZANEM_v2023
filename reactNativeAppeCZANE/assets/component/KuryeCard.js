import React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KuryeCard({ params }) {
  const [currDelivered, setCurrDelivered] = useState(params.item.delivered);
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.orderNumber}>Sipariş Numarası: {params.item.orderNumber}</Text>
      <Text style={[styles.address,{fontWeight: "bold"}]}>Adres: <Text style={styles.date}>{params.item.address}</Text></Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>Sipariş Tarihi: <Text style={styles.date}>{params.item.orderDate}</Text> </Text>
      <Text style={[styles.date,{fontWeight: "bold"}]}>
        Tahmini Teslim Tarihi: <Text style={styles.date}>{params.item.orderDate}</Text>
      </Text>
      {/* <Text style={styles.date}>Sipariş Durumu: {currDelivered.toString()}</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, currDelivered && styles.buttonDisabled]}
          onPress={() => {
              setCurrDelivered(true);
          }}
          disabled={currDelivered}
        >
          <Text
            style={[styles.buttonText, currDelivered && styles.buttonTextDisabled]}
          >
            {currDelivered ? "Teslim Edildi" : "Teslim Edilecek"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addressButton}>
          <Text style={styles.buttonText}>Adrese Git</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 50,
      paddingLeft: 20,
      paddingRight: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    searchInput: {
      flex: 1,
      height: 40,
      marginRight: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    titleSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: '#fea11e',
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
      backgroundColor: '#ffce45',
      padding: 16,
      marginBottom: 25,
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
      color: '#a0461b',
      fontSize:18,
    },
    address: {
      marginBottom: 4,
      color: '#a0461b',
    },
    date: {
      fontStyle: 'italic',
      marginBottom: 4,
      color: '#a0461b',
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
      backgroundColor: '#fea11e',
      marginTop: 20,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    addressButton: {
      backgroundColor: '#5ab779',
      marginTop: 20,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    buttonText: {
      color: '#fefff3',
      fontWeight: 'bold',
    },
    buttonDisabled: {
      backgroundColor: '#dbcfbf',
    },
    buttonTextDisabled: {
      color: '#242424',
    },
  });
