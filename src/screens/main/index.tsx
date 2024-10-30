//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import userServices from '../../sevices/userServices';

export type MainScreenProps = StackScreenProps<RootStackParamList, "Main">;

const MainPage = ({ navigation, route } : MainScreenProps) => {
    const {nickname, phoneNumber} = route.params

  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View>
        <Text style={[styles.titleTxt, {paddingBottom: 5}]}>{nickname}님 반갑습니다!</Text>
        <Text style={styles.subTitleTxt}>로그인 성공화면 임시</Text>
      </View>
      <View>
                  <CustomButton
                      btnColor={'#7D85D7'}
                      btnTxtColor={'#FFFFFF'}
                      btnTxt={'홈으로(로그아웃 없어서 임시버튼..)'}
                      disabled={false}
                      onClicked={() => navigation.navigate('Home')}
                  />
              </View>
    </View>
  </View> 
  );

}
;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  titleContainer: {
    height: 52,
    flexDirection: 'flex-start',
    // backgroundColor: 'green',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  contentContainer: {
    flex: 1,
    // backgroundColor: 'red',
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 15,
  },
  titleTxt: {
    fontSize: 48,
    fontWeight: '800',
  },
  subTitleTxt: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default MainPage;
