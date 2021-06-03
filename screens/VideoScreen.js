import React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Keyboard
} from "react-native";

import {
  COLORS,
  FONTS,
  SIZES,
  icons
} from "../constants";

import Video from "react-native-video";

const VideoScreen = ({ navigation, route }) => {
  const URL1 = "https://react-native-s3-bucket.s3.amazonaws.com/myuploads%2F5.689474232715811.mp4"
  const [url, OnChangeUrl] = useState("")
  const [code ,OnChangeCode] = useState("")


  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 16,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#cccccc",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.left_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        {/* 최상단 이름 */}
        <Text style={styles.textTitle}>동영상 보기</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <Text style={styles.formStyle}>코드를 입력해주세요.</Text>
        <TextInput
          value={code}
          onChangeText={OnChangeCode}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />
        {console.log(url)}

        <Text
          // 여기에 fetch 사용하여서 데이터베이스에 입력된 값들 전송
          onPress={() => {
            Keyboard.dismiss()
            // {componentWillUnmount()}
            fetch(`http://3.36.228.255:8088/jpa/S3/${code}`)
              .then((response) => response.json())
              .then((response) => {OnChangeUrl(response)})
            alert("코드 입력 완료!");
          }}
          style={styles.formSubmit}
        >
          {console.log(url.url)}
          확인
        </Text>
      </View>
    );
  }


  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.black,
        flex: 1,
      }}
    >
      

      {renderHeaderBar()}
      <ScrollView>

      {renderForm()}
      </ScrollView>
      
      {/* <Video
            source={{ uri: url.url }}
            controls={true}
            resizeMode="contain"
            style={{
              flex: 1,
            }}
          /> */}
      {console.log(url.url)}
      {url ? (
        <>
          <Video
            source={{ uri: url.url }}
            controls={true}
            resizeMode="contain"
            style={{
              flex: 3,
              marginBottom: 25
            }}
          />
        </>
      ) : <Image source ={require("../assets/images/video_panda.png")} style={{width:380, height:300, resizeMode:"contain", marginBottom:100}}/>}
    
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 66,
    color: COLORS.white,
    ...FONTS.h1,
  },
  formStyle: {
    margin: 16,
    color: COLORS.white,
    ...FONTS.h2,
  },
  formContents: {
    color: COLORS.black,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    width: 330,
    paddingTop: 10,
    padding: 13,
  },
  formSubmit: {
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
    ...FONTS.h2,
    paddingTop: 10,
    padding: 13,
    marginTop: 18,
  },
});

export default VideoScreen;