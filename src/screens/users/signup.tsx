//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";


export type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

const SignUpPage = ({ navigation, route } : SignUpScreenProps) => {
  // const [isValid, setIsValid] = useState(false);

  const [isValidNumber, setIsValidNumber] = useState(false);
  const setPhoneValidation = (value: boolean) => {
    setIsValidNumber(value);
  };

  //인증번호 쪽보여줄건지
  const [isCountStart, setIsCountStart] = useState(false);
  const setCountStart = (value: boolean) => {
    setIsCountStart(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          source={require('../../../assets/images/backArrow.png')}
          style={{width: 30, height: 30}}
        />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={[styles.titleTxt, {paddingBottom: 5}]}>타이틀</Text>
          <Text style={styles.subTitleTxt}>서브타이틀</Text>
        </View>
        <View style={{paddingTop: 45, paddingBottom: 45}}>
          <FloatingTextInput
            title={'휴대폰번호'}
            keyboardType={'phone-pad'}
            isPassword={false}
            setValidation={setPhoneValidation}
          />
          {isCountStart && (
            <>
              <FloatingTextInput
                title={'인증번호'}
                keyboardType={'numeric'}
                isPassword={false}
                setValidation={setPhoneValidation}
              />
              <Text>
                <Text
                  style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
                  인증번호
                </Text>
                를 받지못하셨나요?
              </Text>
            </>
          )}
        </View>
        <View>
          <CustomButton
            btnColor={'#7D85D7'}
            btnTxtColor={'#FFFFFF'}
            btnTxt={'인증번호 받기'}
            disabled={!isValidNumber}
            onClicked={setIsCountStart}
          />
        </View>
      </View>
    </View>
  );
};

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

export default SignUpPage;
