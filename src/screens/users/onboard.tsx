//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../App";
import userServices from '../../sevices/userServices';

export type OnBoardScreenProps = StackScreenProps<RootStackParamList, "OnBoard">;

const OnBoardPage = ({ navigation, route } : OnBoardScreenProps) => {
    const {phoneNumber} = route.params

    const [isValid, setIsValid] = useState(false);
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

    const [isSuccess, setIsSuccess] = useState(false)
  
  //   useEffect(()=>{
  //     console.log(phoneNumber)
  //     console.log(password)
  //   },[phoneNumber, password])
  
  
    const [isValidNickname, setIsValidNickname] = useState(false);
    const setNicknameValidation = (value: boolean) => {
        setIsValidNickname(value);
    };
  
    const [isValidPw, setIsValidPw] = useState(false);
    const setPwValidation = (value: boolean) => {
      setIsValidPw(value);
    };

    useEffect(() => {
        console.log(isValidNickname)
        console.log(isValidPw)
        if (isValidNickname && isValidPw) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }, [isValidPw, isValidPw]);

  //인증번호 유효한지 검사해서 가입절차 진행
  const signUp = async (phoneNumber:string, password:string, nickname: string) => {

    try {
          
      const res = await userServices.signUp(phoneNumber, password,nickname);
    
        console.log(res.status)
        if(res.status === 201){ //왜 201인지...? 
            setIsSuccess(true)
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

  return (
    !isSuccess?(
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
            <Text style={[styles.titleTxt, {paddingBottom: 5}]}>인증이 완료되었습니다.</Text>
            <Text style={styles.subTitleTxt}>비밀번호와 닉네임을 지정해주세요.</Text>
          </View>
          <View style={{paddingTop: 45, paddingBottom: 45}}>
            <FloatingTextInput
              title={'닉네임'}
              keyboardType={'default'}
              isPassword={false}
              setValidation={setNicknameValidation}
              setInput={setNickname}
            />
            <FloatingTextInput
              title={'비밀번호'}
              keyboardType={'default'}
              isPassword={true}
              setValidation={setPwValidation}
              setInput={setPassword}
            />
          </View>
              <View>
                  <CustomButton
                      btnColor={'#7D85D7'}
                      btnTxtColor={'#FFFFFF'}
                      btnTxt={'가입하기'}
                      disabled={!isValid}
                      onClicked={() => signUp(phoneNumber, password, nickname)}
                  />
              </View>
        </View>
      </View>
    ):
    (
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
            <Text style={[styles.titleTxt, {paddingBottom: 5}]}>{nickname}님 반갑습니다!</Text>
            <Text style={styles.subTitleTxt}>가입을 축하드립니다</Text>
          </View>
          <View>
                  <CustomButton
                      btnColor={'#7D85D7'}
                      btnTxtColor={'#FFFFFF'}
                      btnTxt={'로그인 하러가기'}
                      disabled={false}
                      onClicked={() => navigation.navigate('LogIn')}
                  />
              </View>
        </View>
      </View>        
    )

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

export default OnBoardPage;
