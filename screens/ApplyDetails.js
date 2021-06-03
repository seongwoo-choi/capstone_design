import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,

} from "react-native";

import { youtubers, COLORS, SIZES, FONTS, icons } from "../constants";
import LinearGradient from "react-native-linear-gradient";


// 네비게이션 경로
const ApplyDetails = ({ navigation, route }) => {
  const [selectedApplys, setSelectedApply] = React.useState(null);

  // 선택된 영화를 지속적으로 추적
  React.useEffect(() => {
    // 선택한 영화를 가져오고
    let { selectedApply } = route.params;
    // 선택한 영화를 setSelectedMovie에 넣는다.
    setSelectedApply(selectedApply);
  }, []);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 60,
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
        <Text style={styles.textTitle}>세부정보</Text>
      </View>
    );
  }
  function renderApplydetail() {
    return (

      <View
        style={{ flex: 1, justifyContent: "flex-start", marginTop: 30 }}
      >
        <View style={{ marginBottom: 20 }} >
          <Text style={styles.formStyle}>받는 사람</Text>
          <Text style={[styles.formStyle, { backgroundColor: '#747474', height: 40, padding: 7, width: '90%', borderRadius:15, overflow:'hidden' }]}>
            {selectedApplys?.name}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.formStyle}>
            제목
                </Text>
          <Text style={[styles.formStyle, { backgroundColor: '#747474', height: 40, padding: 7, width: '90%', borderRadius:15, overflow:'hidden' }]}>
            {selectedApplys?.title}
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.formStyle}>
            요청사항
                </Text>
          <Text style={[styles.formStyle, { backgroundColor: '#747474', height: 40, padding: 7, width: '90%', borderRadius:15, overflow:'hidden' }]}>
            {selectedApplys?.request}
          </Text>
        </View>
        <View >
          <Text style={styles.formStyle}>
            사연
                </Text>
          <Text style={[styles.formStyle, { backgroundColor: '#747474', height: 150, padding: 7, width: '90%', borderRadius:15, overflow:'hidden' }]}>
            {selectedApplys?.story}
          </Text>
        </View>
      </View>
    )
  }
  function renderUploadbutton() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
            marginLeft: 20,
            marginRight: 20
          }}
          onPress={() =>
            navigation.navigate('s3', {})
          }
        >
          <Text style={{ ...FONTS.h2 }}>
            이 사연을 채택하기!
          </Text>
        </TouchableOpacity>
      </View>
    )
  }


  return (

    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
      style={{ backgroundColor: COLORS.black }}

    >
      {/* Header */}
      {renderHeaderBar()}
      {renderApplydetail()}
      {renderUploadbutton()}


    </ScrollView>
  );
};


export default ApplyDetails;
const styles = StyleSheet.create({
  formStyle: {
    marginTop: 10,
    color: COLORS.white,
    ...FONTS.h3,
    marginLeft: 20
  },
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 66,
    color: COLORS.white,
    ...FONTS.h1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.black,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    color: "white",
  },
  textStyle: {
    padding: 10,
    color: "white",
    textAlign: "center",
  },
  textStyleGreen: {
    padding: 10,
    color: "green",
  },
  textStyleWhite: {
    padding: 10,
    color: "white",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "orange",
    marginVertical: 10,
    width: "100%",
  },
  buttonStyleGreen: {
    alignItems: "center",
    backgroundColor: "green",
    marginVertical: 10,
    width: "100%",
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    margin: 5,
  },

});