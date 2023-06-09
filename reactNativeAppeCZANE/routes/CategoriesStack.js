import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from '../screens/Categories';
import medicineCategory from '../screens/medicineCategory';
import medicineView from '../screens/medicineView';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => (
  <Stack.Navigator
    initialRouteName="Categories"
    screenOptions = {{
      headerShown: true,
      headerTitleStyle: {
        fontWeight: "bold",
        textTransform: 'uppercase',
        color: '#444',
      },
      headerStyle: {
        justifyContent: 'center',
      },
    }}
  >
    <Stack.Screen
      name="Categories"
      options={({ navigation, route }) => ({
        title: "Kategoriler",
      })}
    >
      {(props) => <Categories {...props}/>}
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
    <Stack.Screen
      name="medicineView"
      options={({navigation, route}) => ({
        title: "Ürünler",
        animation: "slide_from_bottom"
      })}
    >
      {(props) => <medicineView {...props}/>}
    </Stack.Screen>
  </Stack.Navigator>
);

export default CategoriesStack;