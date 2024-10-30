//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import userServices from '../../sevices/userServices';
import { Alert } from 'react-native';
import userType from '../../types/users';
import { atom, useAtom } from 'jotai'
import { USER_ID, USER_NICKNAME } from '../../store';

// import { updateUserId, updateUserNickname } from '../../store/actions/users';

export type LogInScreenProps = StackScreenProps<RootStackParamList, "LogIn">;

const LoginPage = ({ navigation, route } : LogInScreenProps) => {
  const [loginErrMsg, setLoginErrorMsg] = useState('') //loginErrMsg가 바뀌고 재랜더링 되면서 여기도 실행되어서 다시 ''으로 초기화되는건가..??

  const [isValid, setIsValid] = useState(false);

  const [isValidNumber, setIsValidNumber] = useState(false);
  const setPhoneValidation = (value: boolean) => {
    setIsValidNumber(value);
  };

  const [isValidPw, setIsValidPw] = useState(false);
  const setPwValidation = (value: boolean) => {
    setIsValidPw(value);
  };

  useEffect(() => {
    if (isValidNumber && isValidPw) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isValidNumber, isValidPw]);

  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')

  const [userId, setUserId] = useAtom(USER_ID)
  const [nickname, setNickname] = useAtom(USER_NICKNAME)

  const login = async(phoneNumber:string, password:string) => {

    try {
          
      const res = await userServices.getUsers();
    
        // console.log(res)
        if(res.status === 201 || res.status === 200){ //왜 201인지...? 
          console.log("=============")
          const users:userType[] = res.data;

          let flag = false
          users.map((user)=>{
            if(user.phoneNumber === phoneNumber && user.password === password){
              //login 성공  
              console.log('login success')
              setUserId(user.id)
              setNickname(user.nickname)
              setLoginErrorMsg('') 
              flag = true
              navigation.navigate('Main')
              return
            }
          })

          if(!flag){
            setLoginErrorMsg('유효하지 않은 아이디 또는 잘못된 비밀번호 입니다.')
            console.log("flag : " + loginErrMsg)
            Alert.alert(                    
              "에러발생",                    
              "유효하지 않은 아이디 또는 잘못된 비밀번호 입니다.",                         
              [                              
                  {
                  text: "",                                   
                  style: "cancel"
                  },
              ],
              { cancelable: false }
              );
              return
          }

        }else{
            Alert.alert(                    
                "에러발생",                    
                "서버에서 예상치못한 에러가 발생했습니다. \n나중에 다시 시도해주세요.",                         
                [                              
                    {
                    text: "홈화면으로 돌아가기",                              
                    onPress: () => navigation.navigate('Home'),     
                    style: "cancel"
                    },
                ],
                { cancelable: false }
                );
                return
        }

      return res;
    } catch (error) {
      console.log(error);
    }
    }

  
  useEffect(() => {
    console.log("Updated loginErrMsg: ", loginErrMsg);
  }, [loginErrMsg]); // loginErrMsg가 변경될 때마다 확인

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
          <FloatingTextInput
            title={'비밀번호'}
            keyboardType={'default'}
            isPassword={true}
            setValidation={setPwValidation}
            setInput={setPassword}
            errorMsg={loginErrMsg}
          />
          <Text>
            <Text style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
              비밀번호
            </Text>
            를 잊어버리셨나요?
          </Text>
        </View>
        <View>
          <CustomButton
            btnColor={'#7D85D7'}
            btnTxtColor={'#FFFFFF'}
            btnTxt={'로그인'}
            disabled={!isValid}
            onClicked={() => login(phoneNumber, password)}
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

export default LoginPage;
