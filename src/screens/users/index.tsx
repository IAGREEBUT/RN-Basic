//react import
import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';

import { useNavigationContainerRef } from '@react-navigation/native';
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";

export type HomeScreenProps = StackScreenProps<RootStackParamList, "Home">;

type BtnProps = {
  btnColor: string;
  btnTxtColor: string;
  btnTxt: string;
  onClicked: () => void;
};

const MainBtn = (props: BtnProps) => {
  return (
    <>
      <TouchableOpacity
        style={[styles.mainBtn, {backgroundColor: props.btnColor}]}
        onPress={props.onClicked}>
        <Text style={[styles.mainBtnTxt, {color: props.btnTxtColor}]}>
          {props.btnTxt}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const WelcomePage = ({ navigation, route } : HomeScreenProps) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/welcome.png')}
        resizeMode="cover"
        style={styles.image}>
        <View
          style={{
            flex: 2.5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/mainImage.png')}
            style={{width: 148, height: 148, transform: [{translateY: -60}]}}
          />
        </View>
        <View style={{flex: 1, padding: 20}}>
          <MainBtn
            btnColor={'#7D85D7'}
            btnTxtColor={'#FFFFFF'}
            btnTxt={'회원가입'}
            onClicked={() => navigation.navigate('SignUp')}
          />
          <MainBtn
            btnColor={'#EFEDFF'}
            btnTxtColor={'#5E5656'}
            btnTxt={'로그인'}
            onClicked={() => navigation.navigate('LogIn')}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: '#D6D6D6'}} />
            <View>
              <Text
                style={{textAlign: 'center', color: '#D6D6D6', fontSize: 22}}>
                소셜
              </Text>
            </View>
            <View style={{flex: 1, height: 1, backgroundColor: '#D6D6D6'}} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../../assets/images/kakaotalk_sharing_btn_small.png')}
              style={{width: 42, height: 42, margin: 5}}
            />
            <Image
              source={require('../../../assets/images/btnG_아이콘사각.png')}
              style={{width: 42, height: 42, margin: 5}}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainBtn: {
    height: 48,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
  },
  mainBtnTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WelcomePage;
