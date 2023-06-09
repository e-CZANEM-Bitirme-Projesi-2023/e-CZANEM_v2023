import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Search from "../screens/Search";
import medicineView from "../screens/medicineView";
import medicineCategory from "../screens/medicineCategory";
import Barcode from "../screens/Barcode";

const Stack = createNativeStackNavigator();

const BarcodeStack = () => (
  <Stack.Navigator
    initialRouteName="Barcode"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
    }}
  >
    <Stack.Screen
      name="Barcode"
      options={({ navigation, route }) => ({
        title: "Receteli Ürün Satışı",
      })}
    >
      {(props) => <Barcode {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name="medicineView"
      options={({navigation, route}) => ({
        title: "medicineP View",
        animation: "slide_from_bottom",
      })}
    >
      {(props) => <medicineView {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name='medicineCategory'
      options={({ navigation, route }) => ({
        title: 'medicineP Category',
        animation: "slide_from_right",
      })}
    >
      {(props) => <medicineCategory {...props}/>}
    </Stack.Screen>
    
  </Stack.Navigator>
);

export default BarcodeStack;