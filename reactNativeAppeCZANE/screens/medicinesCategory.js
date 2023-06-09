import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { View } from "react-native";
import medicineCard from "../assets/component/medicineCard";
import globalStyles from "../assets/styles/globalStyles";
import getRequest from "../assets/component/getRequest";

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

export default function medicineCategory({ navigation, route }){
  const [category, setCategory] = useState(route.params);
  const [dataForFlatlist, setDataForFlatlist] = useState([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category,
      // headerTitleAlign: 'center',
    });
  }, [navigation, category]);

  useEffect(() => {
    //useEffect
  }, [category]);

  useEffect(() => {
    var allData = [];
    const fetchPosts = async () => {
      const postsData = await getRequest(
        "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllProducts"
      ); // url gelecek
      if (postsData) {
        setDataForFlatlist(
          postsData.filter((item) => item.type.includes(category) && item.isreceteli == "false") // ise yarar
        );
        allData = postsData;
        return allData;
      }
    };
    fetchPosts().catch((error) => {
      alert(error);
    });
  }, []);



  return(
    <View style={ globalStyles.screen }>
      <View>
        <FlatList
          showsVerticalScrollIndicator={ false }
          data={ dataForFlatlist }
          ListHeaderComponent={() => (
            <View
              style={{
                height: 12,
              }}
            ></View>
          )}
          ListFooterComponent={() => (
            <View
              style={{
                height: 12,
              }}
            ></View>
          )}
          renderItem={({ item }) => (
            <medicineCard navigation={ navigation } route={ route } medicineP={ item } isSearch={true}/>
          )}
        />
      </View>
    </View>
  );
}