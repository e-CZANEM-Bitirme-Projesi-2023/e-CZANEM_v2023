import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import KuryeCard from "../assets/component/KuryeCard";

const OrdersScreen = () => {
  const ordersData = [
    {
      orderNumber: "123",
      address:
        "123 Main Stllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
      orderDate: "2022-01-01",
      estimatedDeliveryDate: "2022-01-10",
      delivered: false,
    },
    {
      orderNumber: "673",
      address: "456 Elm St",
      orderDate: "2022-01-02",
      estimatedDeliveryDate: "2022-01-11",
      delivered: false,
    },
    {
      orderNumber: "51223",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "5",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "51243532",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "512423423432",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "512432432423",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "5123423",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
    {
      orderNumber: "5122",
      address: "789 Oak St",
      orderDate: "2022-01-03",
      estimatedDeliveryDate: "2022-01-12",
      delivered: false,
    },
  ];

  const [searchText, setSearchText] = useState("");
  const [orders, setOrders] = useState(ordersData);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    const filteredOrders = ordersData.filter((order) =>
      order.orderNumber.includes(searchText)
    );
    setOrders(filteredOrders);
  }, [searchText]);

  const handlePress = (orderNumber, delivered) => {
    console.log(`Order ${orderNumber} delivered`);
    console.log(delivered.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Sipariş numarası ile ara"
          onChangeText={handleSearch}
          value={searchText}
        />
      </View>
      <View style={styles.line} />
      <Text style={styles.title}>Siparişler</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderNumber}
        renderItem={(renderItem) => <KuryeCard params={renderItem} />}
        style={styles.flatlist}
      />
    </View>
  );
};

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

export default OrdersScreen;
