import React, { Component, useState } from "react";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";
// Import required components
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { RNS3 } from "react-native-aws3";
import { launchImageLibrary } from "react-native-image-picker";
import { ScrollView, State } from "react-native-gesture-handler";
import Video from "react-native-video";
import App from "../App";

const UploadScreen = ({ navigation, route }) => {
  // class에서 this.state.filePath, this.setState 와 같은 뜻이다.
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState("");
  const [video_uri, setvideouri] = useState("");
  const randomValue = () => {
    for (var i = 0; i < 5; i++) {
      value = Math.random() * 5 + 1;
    }
    return value;
  };

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
        <Text style={styles.textTitle}>비디오 업로드</Text>
      </View>
    );
  }

  const chooseFile = () => {
    let options = {
      mediaType: "video",
    };
    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      setUploadSuccessMessage("");
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  const uploadFile = () => {
    if (Object.keys(filePath).length == 0) {
      alert("Please select video first");
      return;
    }
    RNS3.put(
      {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath.uri,
        name: randomValue() + ".mp4",
        type: "video/mp4",
      },
      {
        keyPrefix: "myuploads/", // Ex. myuploads/
        bucket: "react-native-s3-bucket", // Ex. aboutreact
        region: "ap-northeast-2", // Ex. ap-south-1
        accessKey: "",
        secretKey: "",
        successActionStatus: 201,
      }
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`
        )
      )
      .then((response) => {
        if (response.status !== 201) alert("Failed to upload video to S3");
        console.log(response.body);
        setFilePath("");
        let { bucket, etag, key, location } = response.body.postResponse;
        setUploadSuccessMessage(
          `Uploaded Successfully: 
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`
        );
        setvideouri(location);

        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://bucket.s3.amazonaws.com/**.png"
         *   }
         * }
         */
      });
  };
  const updateServer = () => {
    // console.log(video_uri);
    let show_code = Math.random().toString(36).substr(2, 11);
    alert(show_code);
    fetch("http://3.36.228.255:8088/jpa/S3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: video_uri,
        code: show_code,
      }),
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
        Alert("ERROR! Check your log");
      });

    setvideouri(null);
    setUploadSuccessMessage(
      `The video has been uploaded.
      \n- code => ${show_code}
      \n- url => ${video_uri}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeaderBar()}
      <Image
        source={require("../assets/images/video_panda.png")}
        style={{
          width: 380,
          height: 300,
          resizeMode: "contain",
          marginBottom: 50,
          marginTop: 80,
        }}
      />
      <View style={styles.container}>
        {filePath.uri ? (
          <>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyle}
              onPress={uploadFile}
            >
              <Text style={styles.textStyleWhite}>비디오 업로드</Text>
            </TouchableOpacity>
          </>
        ) : null}
        {video_uri ? (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={updateServer}
          >
            <Text style={styles.textStyleWhite}>메일로 전송하기</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={chooseFile}
        >
          <Text style={styles.textStyleWhite}>비디오 선택</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.textStyleWhite}>처음으로</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  textTitle: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 50,
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
    color: "black",
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  textStyleGreen: {
    padding: 10,
    color: "green",
  },
  textStyleWhite: {
    padding: 10,
    color: "black",
    ...FONTS.h2,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
    width: "100%",
    borderRadius: 15,
    height: 50,
    marginBottom: 20,
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
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
