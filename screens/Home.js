import { TestScheduler } from "@jest/core";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { youtubers ,dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";


const Home = ({ navigation, loginINFO, setloginINFO }) => {


  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;
  const [logout, setlogout] = useState(0)

  var celdata// 서버에서 받은 데이터를 저장
  let SingerVAR =[]
  var flagvr = '0'
  
  function getAlldata() {
    fetch(`http://3.36.228.255:8088/jpa/cel`)
              .then((response) => response.json())
              .then((response) => {celdata = response; 
              
              })
    flagvr = '1'
    console.log('finish fetch')
  }// 서버에서 받아오기

  React.useEffect(() => {
    if(logout == 1){
      alert('로그아웃 되었습니다.')
      setloginINFO(null)
      setlogout(0)
    }
  }, [logout]);


  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Profile */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => console.log("Profile")}
        >
          <Image
            source={icons.panda}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          ></Image>
        </TouchableOpacity>

        {/* Screen Mirror */}
        {/* <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => {
            setlogout(1)

          }}
        >
          <Image
            source={icons.airplay}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.primary,
            }}
          ></Image>
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderNewSeasonSection() {
    
    return (
      <Animated.FlatList
        horizontal // 세로로 쌓는 대신 가로로 나란히 렌더링
        pagingEnabled 
        snapToAlignment="center"
        snapToInterval={SIZES.widt}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={youtubers.Celebrity} // 여기를 수정해야함. 
        keyExtractor={(item) => `${item.id}`} 
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("YoutuberDetail", { selectedYoutuber: item })
              }
            >
              
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* 썸네일 */}
                {//findsingerThumb(item.name)
                }
                <ImageBackground
                  source={item.thumbnail}//여기를 requir thumbnail 로 작성해보기
                  resizeMode="cover"
                  style={{
                    width: SIZES.width * 0.85,
                    height: SIZES.height * 0.5,
                    justifyContent: "flex-end",
                  }}
                  imageStyle={{
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: 60,
                      width: "100%",
                      marginBottom: SIZES.radius,
                      paddingHorizontal: SIZES.radius,
                      // backgroundColor: COLORS.primary
                    }}
                  >
                    {/* Play Now */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: COLORS.transparentWhite,
                        }}
                      >
                        {/* 신청 아이콘으로 변경 */}
                        <Image
                          source={icons.apply}
                          resizeMode="contain"
                          style={{
                            width: 28,
                            height: 28,
                            tintColor: COLORS.transparentWhite,
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          marginLeft: SIZES.base,
                          color: COLORS.white,
                          ...FONTS.h3,
                        }}
                      >
                        {item.name}의 자세한 정보!
                      </Text>
                    </View>
                    {/* Still Watching */}
                    {/* {item.stillWatching.length > 0 && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          Still Watching
                        </Text>
                        <Profiles profiles={item.stillWatching} />
                      </View>
                    )} */}
                  </View>
                </ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
          
        }}
      />
      
    );

  
  }

  function renderDots() {
    // 불투명도 도트 너비와 도트 색상
    const dotPosition = Animated.divide(newSeasonScrollX, SIZES.width);

    return (
      <View
        style={{
          marginTop: SIZES.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {dummyData.newSeason.map((item, index) => {
          // 불투명도
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          // 도트 너비
          const dotWith = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            // 츨략 범위
            outputRange: [6, 20, 6],
            extrapolate: "clamp",
          });

          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            // 츨략 범위
            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={{
                borderRadius: SIZES.radius,
                marginHorizontal: 3,
                width: dotWith,
                height: 6,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  }

  function renderYoutuberSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Youtubers
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
          />
        </View>

        {/* List */}
        <FlatList
            horizontal
            // 수평 스크롤 표시기
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop: SIZES.padding
            }}
            data={youtubers.youtuber}//이거 역시 수정.
            keyExtractor={item=>`${item.id}`}
            renderItem={({item, index})=>{
                return (
                    <TouchableWithoutFeedback
                        onPress={()=>navigation.navigate("YoutuberDetail", {selectedYoutuber: item, selectedUser: loginINFO})}
                    >
                        <View
                            style={{
                                marginLeft: index == 0 ? SIZES.padding : 20,
                                marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0,
                            }}
                        >
                            {/* 썸네일 */}
                            <Image
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width / 3,
                                    height: (SIZES.width / 3) + 60,
                                    borderRadius: 20
                                }}
                            />

                            {/* Name */}
                            <Text style={{marginTop:SIZES.base, color: COLORS.white, ...FONTS.h4, }}>{item.name}</Text>
                        
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        />
      </View>
    );
  }

  function renderCelebritySection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Celebritys
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
          />
        </View>

        {/* List */}
        <FlatList
            horizontal
            // 수평 스크롤 표시기
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop: SIZES.padding
            }}
            data={youtubers.Celebrity}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item, index})=>{
                return (
                    <TouchableWithoutFeedback
                        onPress={()=>navigation.navigate("CelebrityDetail", {selectedCelebrity: item})}
                    >
                        <View
                            style={{
                                marginLeft: index == 0 ? SIZES.padding : 20,
                                marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0,
                            }}
                        >
                            {/* 썸네일 */}  
                            <Image
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width / 3,
                                    height: (SIZES.width / 3) + 60,
                                    borderRadius: 20
                                }}
                            />

                            {/* Name */}
                            <Text style={{marginTop:SIZES.base, color: COLORS.white, ...FONTS.h4, }}>{item.name}</Text>
                        
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        />
      </View>
    );
  }

  function renderSportsSection() {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: SIZES.padding,
            alignItems: "center",
          }}
        >
          <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>
            Sports
          </Text>
          <Image
            source={icons.right_arrow}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.primary,
            }}
          />
        </View>

        {/* List */}
        <FlatList
            horizontal
            // 수평 스크롤 표시기
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                marginTop: SIZES.padding
            }}
            data={youtubers.Sports}
            keyExtractor={item=>`${item.id}`}
            renderItem={({item, index})=>{
                return (
                    <TouchableWithoutFeedback
                        onPress={()=>navigation.navigate("CelebrityDetail", {selectedCelebrity: item})}
                    >
                        <View
                            style={{
                                marginLeft: index == 0 ? SIZES.padding : 20,
                                marginRight: index == dummyData.continueWatching.length - 1 ? SIZES.padding : 0,
                            }}
                        >
                            {/* 썸네일 */}  
                            <Image
                                source={item.thumbnail}
                                resizeMode="cover"
                                style={{
                                    width: SIZES.width / 3,
                                    height: (SIZES.width / 3) + 60,
                                    borderRadius: 20
                                }}
                            />

                            {/* Name */}
                            <Text style={{marginTop:SIZES.base, color: COLORS.white, ...FONTS.h4, }}>{item.name}</Text>
                        
                        </View>
                    </TouchableWithoutFeedback>
                )
            }}
        />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {renderHeader()}
      
   
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
          {/* {//flagvr == '0' ?  
          getAlldata()
          //:null
          } */}
          {renderNewSeasonSection()
          }
          {renderDots()}
          {renderYoutuberSection()}
          {renderCelebritySection()}
          {renderSportsSection()}
        
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
