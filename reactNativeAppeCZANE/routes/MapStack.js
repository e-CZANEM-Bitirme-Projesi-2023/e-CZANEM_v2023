import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../screens/Settings";
import About from "../screens/About";
import Maps from "../screens/MapScreen";

const Stack = createNativeStackNavigator();

const MapStack = () => (
  <Stack.Navigator
    initialRouteName="About"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
      headerShadowVisible: false,
      animation:"fade"
    }}
  >
    <Stack.Screen
      name="Maps"
      options={({ navigation, route }) => ({
        title: "Yakınımdaki Eczaneler",
      })}
    >
      {(props) => <Maps {...props}/>}
    </Stack.Screen>
  </Stack.Navigator>
);

export default MapStack;