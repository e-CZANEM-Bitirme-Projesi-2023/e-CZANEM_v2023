import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Animated,
  Easing,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import medicineCard from "../assets/component/medicineCard";
import window from "../assets/controller/window";
import globalStyles from "../assets/styles/globalStyles";
import getRequest from "../assets/component/getRequest";
import axios from "axios";
import AppContext from "../assets/globals/appContext";

const { width } = Dimensions.get("window");
let isFirstOpen = true;
let isAnimation = false;
let isClick = false;

function compareStrings(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

function findMatches(wordToMatch, medicinesP) {
  return medicinesP.filter((medicineP) => {
    const regex = new RegExp(wordToMatch, "gi");
    if (medicineP.name.match(regex) || medicineP.tagalog.match(regex)) return true;
    else if (matchType(wordToMatch, medicineP.type)) return true;
    else if (matchSpecial(wordToMatch, medicineP.special)) return true;
    else if (matchKeywords(wordToMatch, medicineP.keywords)) return true;
    else return false;
  });
}

function matchType(wordToMatch, type) {
  const regex = new RegExp(wordToMatch, "gi");
  for (let i = 0; i < type.length; i++) {
    if (type[i].match(regex)) {
      return true;
    }
  }
}

function matchSpecial(wordToMatch, special) {
  if (special == null) return false;
  const regex = new RegExp(wordToMatch, "gi");
  for (let i = 0; i < special.length; i++) {
    if (special[i].match(regex)) {
      return true;
    }
  }
}

function matchKeywords(wordToMatch, keywords) {
  if (keywords == null) return false;
  const regex = new RegExp(wordToMatch, "gi");
  for (let i = 0; i < keywords.length; i++) {
    if (keywords[i].match(regex)) {
      return true;
    }
  }
}

async function postRequestGetReceteli(url, receteid, tcno) {
  try {
    const postData = {
      receteid: receteid,
      tcno: tcno,
    };
    const response = await axios.post(url, postData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Barcode({ navigation, route }) {
  const [searchText, setSearchText] = useState(null);
  const [posts, setPosts] = useState([]);
  const [medicinesP, setMedicinesP] = useState(
    posts.sort((a, b) => {
      return compareStrings(a.name, b.name);
    })
  );
  const [receteNo, setReceteNo] = useState("");
  const [tcNo, setTcNo] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;

  const fetchPosts = async () => {
    const postsData = await postRequestGetReceteli(
      "http://eczanev2-dev.eu-central-1.elasticbeanstalk.com/api/getReceteler",
      receteNo,
      tcNo
    ); // url gelecek
    if (postsData) {
      setPosts(postsData);
      stopAnimation();
      if (isFirstOpen) {
        setMedicinesP(postsData);
        isFirstOpen = false;
      }
      console.log(posts);
    }
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
    isAnimation = true;
    fetchPosts();
  };

  const stopAnimation = () => {
    animatedValue.stopAnimation();
    isAnimation = false;
  };

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    console.log("istek atti");

    //fetchPosts();
  }, [searchText]); //bu istek bir butona tasinacak...

  const onChange = (string) => {
    let word = string.replace(/[^a-zA-Z -]/g, "");
    setSearchText(word);
    if (word.length > 0) setMedicinesP(findMatches(word, posts));
    else
      setMedicinesP(
        posts.sort((a, b) => {
          //bakilmasi lazim ilk acildiginda ekrana gelen kisim burasi
          return compareStrings(a.name, b.name);
        })
      );
  };

  return (
    <View style={globalStyles.screen}>
      <View style={styles.container2}>
        <View style={styles.leftContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Reçete No"
              value={receteNo}
              onChangeText={setReceteNo}
            />
            <TextInput
              style={styles.input}
              placeholder="Kimlik Numarası"
              value={tcNo}
              onChangeText={setTcNo}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            isClick = true;
            if (isAnimation) {
              stopAnimation();
            } else {
              startAnimation();
            }
          }}
        >
          <Animated.View
            style={[styles.buttonContainer, { transform: [{ rotate: spin }] }]}
          >
            <Icon type="material-icons" name="search" color="white" size={35} />
          </Animated.View>
        </TouchableOpacity>
      </View>
      {posts.length > 0 ? (
        <FlatList
          persistentScrollbar={true}
          data={posts}
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
            <medicineCard
              medicineP={item}
              navigation={navigation}
              route={route}
              isSearch={true}
            /> //
          )}
        />
      ) : (
        isClick && 
        <View style={ styles.emptyContainer }>
          <Icon
            type="material-icons"
            name="search"
            size={ window.width/3 > 240 ? 240 : window.width/3 }
            color="#bbb"
          />
          <View style={ styles.emptyLabelContainer }>
            <Text style={ styles.emptyLabel }>Herhangi Bir Kayıt Bulunamadı !</Text>
            <Text style={ styles.emptyLabelDetails }>
              Reçete No ve TC No Doğru Girdiğinizden Emin Olunuz..!
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4080f018",
    marginTop: 40,
  },
  searchField: {
    textAlignVertical: "center",
    paddingRight: 8,
    fontSize: 16,
    flex: 1,
    color: "#444",
  },
  emptyContainer: {
    padding: 32,
    height: window.height / 3 + 16,
    maxHeight: 480,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    flex: 3,
    marginRight: 10,
  },
  emptyLabelContainer: {
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyLabel: {
    fontSize: window.width / 20 > 32 ? 32 : window.width / 20,
    fontWeight: "bold",
    color: "#888",
  },
  emptyLabelDetails: {
    textAlign: "center",
    marginVertical: 8,
    color: "#aaa",
    fontSize: window.width / 32 > 24 ? 24 : window.width / 32,
    width: window.width / 1.5,
    maxWidth: 480,
  },
  inputContainer: {
    width: window.width / 1.3,
    paddingHorizontal: 10,
  },
  container2: {
    paddingTop: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: 40,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 7,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 23,
    backgroundColor: "#6495ED",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});
