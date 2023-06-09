import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Discover from "../screens/Discover";
import medicineView from "../screens/medicineView";
import medicineCategory from "../screens/medicineCategory";

const Stack = createNativeStackNavigator();

const DiscoverStack = () => (
  <Stack.Navigator
    initialRouteName="Discover"
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
      name="Discover"
      options={({ navigation, route }) => ({
        title: "Ürünler",
      })}
    >
      {(props) => <Discover {...props}/>}
    </Stack.Screen>


    <Stack.Screen
      name="medicineView"
      options={({navigation, route}) => ({
        title: "medicineP View",
        animation: "slide_from_bottom"
      })}
    >
      {(props) => <medicineView {...props}/>}
    </Stack.Screen>

    <Stack.Screen
      name='medicineCategory'
      options={({ navigation, route }) => ({
        title: 'medicineP Category',
        animation: "slide_from_right"
      })}
    >
      {(props) => <medicineCategory {...props}/>}
    </Stack.Screen>

  </Stack.Navigator>
);

export default DiscoverStack;