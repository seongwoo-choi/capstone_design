import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";

import {
  youtubers,
  dummyData,
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
} from "../constants";

const Apply = ({ navigation, route, }) => {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [title, onChangeTitle] = useState("");
  const [requests, onChangeRequests] = useState("");
  const [story, onChangeStory] = useState("");
  const [selectedName, setSelectedName] = useState(null);
  //const [userId, setUserId] = userState("캡스톤");

  React.useEffect(() => {
    // 선택한 영화를 가져오고
    let { selectedName } = route.params;
    // 선택한 영화를 setSelectedMovie에 넣는다.
    setSelectedName(selectedName);
  }, []);

  

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
        <Text style={styles.textTitle}>사연 신청</Text>
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", justifyContent: "flex-start" }}
      >
        <Text style={styles.formStyle}>선물 받으시는 분의 성함</Text>
        <TextInput
          value={name}
          onChangeText={onChangeName}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />

        <Text style={styles.formStyle}>선물 받으시는 분의 이메일</Text>
        <TextInput
          value={email}
          onChangeText={onChangeEmail}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />

        <Text style={styles.formStyle}>제목</Text>
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />

        <Text style={styles.formStyle}>요청사항</Text>
        <TextInput
          value={requests}
          onChangeText={onChangeRequests}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />

        <Text style={styles.formStyle}>사연</Text>
        <TextInput
          value={story}
          onChangeText={onChangeStory}
          autoCapitalize={"none"}
          autoCorrect={false}
          multiline={true}
          keyboardType="default"
          style={styles.formContents}
        />
        {console.log({ name }, { email }, { title }, { requests }, { story }, {selectedName})}

        <Text
          // 여기에 fetch 사용하여서 데이터베이스에 입력된 값들 전송
          onPress={() => {
            // {componentWillUnmount()}
            fetch("http://3.36.228.255:8088/jpa/apply", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "title":title,
                    "request":requests,
                    "story" : story,
                    "selectedYoutuberName" : selectedName,
                    "code" : null
                }),
              }).then((response) => console.log(response))
              .catch((error) => {
                console.log(error)
                console.log("ERROR! Check your log")
            })  
            alert("신청 완료!");
            navigation.navigate("Home");
          }}
          style={styles.formSubmit}
        >
          신청하기
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
      <KeyboardAvoidingView behavior='padding'>
      <ScrollView
        contentContainerStyle={{  backgroundColor: COLORS.black }}
        style={{ backgroundColor: COLORS.black }}
      >
        {renderForm()}
      </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 30,
  },
});

export default Apply;
