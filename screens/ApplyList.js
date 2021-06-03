import React from "react";
import { useState, Component, useEffect} from "react";
import { SafeAreaView,StyleSheet, Text, View,TouchableOpacity, Image, ScrollView, FlatList,TouchableWithoutFeedback } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";


const ApplyList = ({ navigation, route }) => {
    
    const [loginINFO, setloginINFO] = useState(null);
    const [showlist, setshowlist] = useState(null);
    const [token, settoken] = useState(null);
    const [flag, setflag] = useState(0)
    
    
    React.useEffect(() => {
        // 로그인정보
        let loginINFO  = route.params.selectedName;
        // 로그인 정보
        setloginINFO(loginINFO);
        console.log(loginINFO)
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
            <Text style={styles.textTitle}>신청 리스트</Text>
          </View>
        );
      }

//이부분은 서버 연결 후 수정할 부분
const getData = () => {
  //setLoading(true);
  fetch(`http://3.36.228.255:8088/jpa/apply/Bycel/${loginINFO}`)
    .then((res) => res.json())
    .then((res) => {
      setshowlist(res)
      setflag(1)
    })
  
  // 
  
};
    const renderItem = ({ item, index }) => {
      return (
        <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("ApplyDetails", { selectedApply : item })
              }
              style = {{marginTop:20}}
            >
        <View
          style={styles.list_style}>
          <View>
            <Text style={[styles.text, { 
              flex: 1, 
              fontSize: 23, 
              marginTop: 10, 
              marginLeft: 20, 
              color:'white',
              fontWeight: "700"
              }]}>
              {item.title}
              </Text>
            <Text style={[styles.text, { flex: 1, color: 'white', marginLeft: 20, marginTop:5, fontSize:15 }]}>{item.request}</Text>
          </View>
          <View>
            
          </View>
        </View>
        </TouchableWithoutFeedback>
      );
    };

    
    const flatview =()=>{
      return(
      <FlatList
          data={showlist}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.apply_id)}
          style={{
            margin: 15,
          }}
      />
      )
    }
    return(
     
    <SafeAreaView
      style={{
        backgroundColor: COLORS.black,
        flex: 1,
      }}
    >
      {renderHeaderBar()}
      {flag == 0 ? getData() : flatview()}
    </SafeAreaView>
    )
    
}
export default ApplyList;
const styles = StyleSheet.create({
    list_style :{
        width: '100%',
        height: 80,
        flexDirection: 'row', // row
        backgroundColor: '#747474',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#4C4C4C',
        borderRadius: 20
      },
    textTitle: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 54,
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
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });