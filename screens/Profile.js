import React, { useEffect } from "react";
import { useState, Component } from "react";
import { SafeAreaView,StyleSheet, Text, View, TouchableOpacity,TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";


const Profile = ({ navigation, route, loginINFO, setloginINFO, }) => {
    const [loginname, setloginname] = useState(null);
    const [token, settoken] = useState(null);
    const [logflag, setlogflag] = useState(0);
    const [login_id, onChangeid] = useState("");
    const [login_pw, onChangepw] = useState("");
    const [logout, setlogout] = useState(0)
    React.useEffect(() => {
      if(logflag == 1){
      console.log('useeffct '+loginname)
      setloginINFO(loginname)
      setlogflag(0)
      }
    }, [logflag]);
    React.useEffect(() => {
      if(logout == 1){
        alert('로그아웃 되었습니다.')
        setloginINFO(null)
        setlogout(0)
      }
    }, [logout]);
  function gettoken() {
    fetch("http://3.36.228.255:8080/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'username': login_id,
        'password': login_pw
      }),
    })
      .then((response) => {
        console.log('token '+response.headers.map.authorization)
        settoken(response.headers.map.authorization)
        getloginfo()
      })
      .catch((error) => {
        console.log(error);
        Alert("ERROR! Check your log");
  });
  }
  function getloginfo() {
    fetch('http://3.36.228.255:8080/api/user', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
    })
    .then(res => res.json())
    .then(data => { 
      setloginname(data.nickname)  
      console.log(data)
      setlogflag(1)
      navigation.navigate("Profile");
    })
    .catch(err => { console.log(err) })
  
  }

    function renderlogin() {
      
      return(
        
        <View style={{flex : 1,}}>
          <ScrollView>
          <Text style={styles.titleText}> 로그인 </Text>
          <View style={styles.container}>
            <Text style={styles.formStyle}>ID</Text>
            <TextInput
              value={login_id}
              onChangeText={onChangeid}
              autoCapitalize={"none"}
              autoCorrect={false}
              multiline={true}
              keyboardType="default"
              style={styles.formContents}
            />
            <Text style={styles.formStyle}>PASSWORD</Text>
            <TextInput
              value={login_pw}
              onChangeText={onChangepw}
              autoCapitalize={"none"}
              autoCorrect={false}
              multiline={false}
              keyboardType="default"
              style={styles.formContents}
              placeholder = "비밀번호"
              secureTextEntry = {true}
            />
                    <Text
          // 여기에 fetch 사용하여서 데이터베이스에 입력된 값들 전송
          onPress={() => {
            if(login_id == '' || login_pw == ''){
              alert('아이디와 패스워드를 입력하십시오.')
            }
            else{
            gettoken()
            }
          }}
          style={styles.formSubmit}
        >
          로그인
        </Text>
          </View>
          </ScrollView>
          </View>
      )
    }

    function renderProfile()
    {
      return(
        <View>
        <Text style={styles.titleText}> {loginINFO} Profile </Text>
      <View style={styles.container}>
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
            navigation.navigate('ApplyList', {selectedName: loginINFO})
          }
        >
          <Text style={{ ...FONTS.h2 }}>
            신청리스트 확인
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "ios" ? SIZES.padding * 2 : 0,
            borderRadius: 15,
            backgroundColor: COLORS.primary,
            
          }}
          onPress={() =>{
            settoken(null)
            setlogout(1)
          }
          }
        >
          <Text style={{ ...FONTS.h2 }}>
            로그아웃
          </Text>
        </TouchableOpacity>

        </View>
        </View>
      )
    }
    return(
    
    <SafeAreaView style={styles.container}>
     {loginINFO ? renderProfile(): renderlogin()}
    </SafeAreaView>
    )
}
export default Profile;
const styles = StyleSheet.create({
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
      width: 370,
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
      marginTop: 20,
      marginLeft: 150
    },
  });