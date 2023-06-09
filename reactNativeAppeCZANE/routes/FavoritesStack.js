import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "../screens/Favorites";
import medicineView from "../screens/medicineView";
import medicineCategory from "../screens/medicineCategory";
import AdressForm from "../screens/AdressForm";
import PaymentPage from "../screens/PaymentScreen";

const Stack = createNativeStackNavigator();

const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName="Favorites"
    screenOptions={{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#444",
      },
    }}
  >
    <Stack.Screen
      name="Favorites"
      options={({ navigation, route }) => ({
        title: "Sepet",
      })}
    >
      {(props) => <Favorites {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="medicineView"
      options={({ navigation, route }) => ({
        title: "medicineP View",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <medicineView {...props} />}
    </Stack.Screen>
    <Stack.Screen
      name="AdressForm"
      options={({ navigation, route }) => ({
        title: "Adres Bilgileri",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <AdressForm {...props} />}
    </Stack.Screen>
    <Stack.Screen  // burasi odeme ekrani olarak stack
      name="PaymentScreen"
      options={({navigation, route}) => ({
        title: "Ödeme Ekranı",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <PaymentPage {...props}/>}
    </Stack.Screen>
    <Stack.Screen
      name="medicineCategory"
      options={({ navigation, route }) => ({
        title: "medicineP Category",
        animation: "slide_from_right",
      })}
    >
      {(props) => <medicineCategory {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default FavoritesStack;
