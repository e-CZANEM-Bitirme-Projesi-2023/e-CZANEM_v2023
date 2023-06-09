import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import medicineCard from "../assets/component/medicineCard";
import window from "../assets/controller/window";
import globalStyles from "../assets/styles/globalStyles";
import getRequest from "../assets/component/getRequest";
let isFirstOpen = true;

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function findMatches(wordToMatch, medicinesP) {
  return medicinesP.filter(medicineP => {
    const regex = new RegExp(wordToMatch, 'gi');
    if (medicineP.name.match(regex) || medicineP.tagalog.match(regex)) return true;
    else if (matchType(wordToMatch, medicineP.type)) return true;
    else if (matchSpecial(wordToMatch, medicineP.special)) return true;
    else if (matchKeywords(wordToMatch, medicineP.keywords)) return true;
    else return false;
  });
}

function matchType(wordToMatch, type){
  const regex = new RegExp(wordToMatch, 'gi');
  for(let i = 0; i < type.length; i++) {
    if(type[i].match(regex)){
      return true;
    }
  }
}

function matchSpecial(wordToMatch, special){
  if(special == null) return false;
  const regex = new RegExp(wordToMatch, 'gi');
  for(let i = 0; i < special.length; i++) {
    if(special[i].match(regex)){
      return true;
    }
  }
}

function matchKeywords(wordToMatch, keywords){
  if(keywords == null) return false;
  const regex = new RegExp(wordToMatch, 'gi');
  for(let i = 0; i < keywords.length; i++) {
    if(keywords[i].match(regex)){
      return true;
    }
  }
}

export default function Search({ navigation, route }) {
  const [searchText, setSearchText] = useState(null);
  const [posts, setPosts] = useState([]);
  const [medicinesP, setMedicinesP] = useState(posts.sort((a, b) => {
    return compareStrings(a.name, b.name);
  }));
  useEffect(() => {
    console.log("istek atti");
    const fetchPosts = async () => {
    const postsData = await getRequest('http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getAllProducts'); // url gelecek
      if (postsData) {
        setPosts(postsData);
        if(isFirstOpen){console.log("medicineP first girdi"); setMedicinesP(postsData); isFirstOpen= false;}
        console.log(posts);
      }
    };
    fetchPosts();
    
    
  }, [searchText]);


  const onChange = (string) => {
    let word = string.replace(/[^a-zA-Z -]/g, '');
    setSearchText(word);
    if(word.length > 0) setMedicinesP(findMatches(word, posts));
    else setMedicinesP(posts.sort((a, b) => { //bakilmasi lazim ilk acildiginda ekrana gelen kisim burasi
      return compareStrings(a.name, b.name);
    }));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={ styles.searchFieldContainer }>
          <Icon
            type="material-icons"
            name="search"
            color="#666"
            style={{
              marginHorizontal: 12,
            }}
          />
          <TextInput
            style={ styles.searchField }
            keyboardType={ "email-address" }
            placeholder="Ürün Adı Giriniz..."
            onChangeText={ onChange }
            value={ searchText }
          ></TextInput>
        </View>
      ),
    });
  }, [navigation, searchText]);

  return(
    <View style={ globalStyles.screen }>
      { true ? (
        <FlatList
        persistentScrollbar={ true }
        data={medicinesP.filter((item) => item.isreceteli == "false")}
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
          <medicineCard medicineP={ item } navigation={ navigation } route={ route } isSearch={true}/> //
        )}
      />      
      ) : (
        <View style={ styles.emptyContainer }>
          <Icon
            type="material-icons"
            name="search"
            size={ window.width/3 > 240 ? 240 : window.width/3 }
            color="#bbb"
          />
          <View style={ styles.emptyLabelContainer }>
            <Text style={ styles.emptyLabel }>No Search Results!</Text>
            <Text style={ styles.emptyLabelDetails }>
              Please search a medicineP name or category!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchFieldContainer: {
    width: window.width - 32,
    paddingVertical: 4,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4080f018',
  },
  searchField: {
    textAlignVertical: 'center',
    paddingRight: 8,
    fontSize: 16,
    flex: 1,
    color: '#444',
  },
  emptyContainer: {
    padding: 32,
    height: window.height/3 + 16,
    maxHeight: 480,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLabel: {
    fontSize: window.width/20 > 32 ? 32 : window.width/20,
    fontWeight: 'bold',
    color: '#888'
  },
  emptyLabelDetails: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#aaa',
    fontSize: window.width/32 > 24 ? 24 : window.width/32,
    width: window.width/1.5,
    maxWidth: 480,
  },
});