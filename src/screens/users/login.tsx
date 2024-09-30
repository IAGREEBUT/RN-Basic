//react import
import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import FloatingTextInput from '../../components/floatingTextInput';
import CustomButton from '../../components/CustomButton';

const LoginPage = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../../../assets/images/backArrow.png')}
          style={{width: 30, height: 30}}
        />
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
          <FloatingTextInput
            title={'비밀번호'}
            keyboardType={'default'}
            isPassword={true}
            setValidation={setPwValidation}
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
