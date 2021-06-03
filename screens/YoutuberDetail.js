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
const YoutuberDetail = ({ navigation, route }) => {
  const [selectedYoutuber, setSelectedYoutuber] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);

  // 선택된 영화를 지속적으로 추적
  React.useEffect(() => {
    // 선택한 영화를 가져오고
    let { selectedYoutuber, selectedUser } = route.params;
    // 선택한 영화를 setSelectedMovie에 넣는다.
    setSelectedYoutuber(selectedYoutuber);
    setSelectedUser(selectedUser)
    console.log(selectedUser)
  }, []);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? 40 : 20,
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
            backgroundColor: COLORS.transparentBlack,
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

        {/* Apply Button */}
        {/* <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 20,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() =>
            navigation.navigate('Apply', {selectedName: selectedYoutuber.name})
          }
        >
          <Image
            source={icons.apply}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderHeaderSection() {
    return (
      <ImageBackground
        source={selectedYoutuber?.details?.image}//여기 수정하기 여기도 requir 사용 삘
        resizeMode="cover"
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.4 : SIZES.height * 0.7,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {renderHeaderBar()}

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            {/* 흐릿하게 보이게 하는 블러쉬 효과 */}
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "#000"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >

              {/* Name */}
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.h1,
                }}
              >
                {selectedYoutuber?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  }

  function renderCategoryAndRatings() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Age */}
        <View
          style={[
            styles.categoryContainer,
            {
              marginLeft: 0,
            },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedYoutuber?.details?.age}
          </Text>
        </View>

        {/* Genre */}
        <View
          style={[
            styles.categoryContainer,
            {
              paddingHorizontal: SIZES.padding,
            },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedYoutuber?.details?.genre}
          </Text>
        </View>

        {/* Subscriber */}
        <View
          style={[
            styles.categoryContainer,
            {
              paddingHorizontal: SIZES.padding,
            },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedYoutuber?.details?.subscriber}
          </Text>
        </View>

        {/* Ratings */}
        {/* <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedYoutuber?.details?.ratings}
          </Text>
        </View> */}
      </View>
    );
  }

  function renderYoutuberDetails() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: "space-around",
        }}
      >
        {/* Title, running time and progress bar */}
        <View>
          {/* Title and running time */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
                {/* 해당 유튜버 자세한 설명 */}
              {selectedYoutuber?.name} 설명
            </Text>
          </View>
        </View>

        {/* Apply */}
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
            
          }}
          onPress={() =>
            navigation.navigate('Apply', {selectedName: selectedYoutuber.name})
          }
        >
          <Text style={{ ...FONTS.h2 }}>
            {selectedYoutuber?.name}에게 신청하기!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
      
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Header */}
      {renderHeaderSection()}

      {/* Category & Ratings */}
      {renderCategoryAndRatings()}

      {/* Movie Details */}
      {renderYoutuberDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default YoutuberDetail;
