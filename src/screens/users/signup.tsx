//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import userServices from '../../sevices/userServices';

export type SignUpScreenProps = StackScreenProps<RootStackParamList, "SignUp">;

const SignUpPage = ({ navigation, route } : SignUpScreenProps) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')

//   useEffect(()=>{
//     console.log(phoneNumber)
//     console.log(password)
//   },[phoneNumber, password])


  const [isValidNumber, setIsValidNumber] = useState(false);
  const setPhoneValidation = (value: boolean) => {
    setIsValidNumber(value);
  };

  const [isValidCode, setIsValidCode] = useState(false);
  const setCodeValidation = (value: boolean) => {
    setIsValidCode(value);
  };


  //인증번호 쪽보여줄건지
  const [isCountStart, setIsCountStart] = useState(false);
  const setCountStart = (value: boolean) => {
    console.log("수행됨 : "+ value)
    setIsCountStart(value);
  };

  const checkCodeValidation = (code:string) => {
    if (code !== '000000'){
        Alert.alert(                    
        "올바르지 않은 코드",                    
        "코드를 다시 확인하여주세요",                         
        [                              
            {
            text: "확인",                              
            onPress: () => console.log("확인누름"),     
            style: "cancel"
            },
        ],
        { cancelable: false }
        );
        return
    }else{
        //code validation이 맞을때만 
        navigation.navigate('OnBoard',{phoneNumber: phoneNumber})
    }
  }

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
            setInput={setPhoneNumber}
          />
          {isCountStart && (
            <>
              <FloatingTextInput
                title={'인증번호'}
                keyboardType={'numeric'}
                isPassword={false}
                setValidation={setCodeValidation}
                setInput={setCode}
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
        <>
        {
            isCountStart ?
            (
                <View>
                    <CustomButton
                    btnColor={'#7D85D7'}
                    btnTxtColor={'#FFFFFF'}
                    btnTxt={'인증하기'}
                    disabled={!isValidCode}
                    onClicked={() => checkCodeValidation(code)}
                    />
                </View>
            )
            :
            (
                <View>
                    <CustomButton
                    btnColor={'#7D85D7'}
                    btnTxtColor={'#FFFFFF'}
                    btnTxt={'인증번호 받기'}
                    disabled={!isValidNumber}
                    onClicked={() => setCountStart(true)}
                    />
                </View>
            )
        }
        </>
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
