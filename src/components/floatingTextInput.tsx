//react import
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  Animated,
  KeyboardTypeOptions,
  TouchableOpacity,
} from 'react-native';

type txtInputProps = {
  title: string;
  keyboardType: KeyboardTypeOptions;
  isPassword: boolean;
  setValidation: (value: boolean) => void;
  setInput:(value: string) => void;
  //유효성 검사 로직을 함수로 받는게 나을듯...
};

const FloatingTitleTxtInput = (props: txtInputProps) => {
  // 텍스트 인풋 활성화여부
  const [isActive, setIsActive] = useState(false);

  // 디자인적 요소
  const [borderColor, setBorderColor] = useState('#D9D9D9');
  const [textColor, setTextColor] = useState('#D9D9D9');
  const [textSize, setTextSize] = useState(22);

  //텍스트 박스 입력값
  const [inputText, setInputText] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [errorTxt, setErrorTxt] = useState('');

  //비밀번호 입력인경우
  const [isHide, setIsHide] = useState(props.isPassword); //최초값은 비번이면 무조건 hide로 설정
  const [hideImg, setHideImg] = useState(
    require('../../assets/images/eye_closed.png'),
  );

  const onInActive = () => {
    //작성된게 없으면, inactive
    if (inputText === '') {
      console.log('적힌게 없음 ');
      setIsActive(false);
      setIsError(false);
      setErrorTxt('');
      return;
    }

    //active상태 -> 에러체크

    // if (props.keyboardType === 'phone-pad') {
    //   if (!/^[0-9]*$/.test(inputText)) {
    //     setIsError(true);
    //     setErrorTxt('휴대폰 번호는 숫자로만 작성해주세요.');
    //     return;
    //   }

    //   if (inputText.length !== 11) {
    //     setIsError(true);
    //     setErrorTxt('유효한 휴대폰 번호가 아닙니다.');
    //     return;
    //   }

    //   setIsError(false);
    // }

    // //비밀번호
    // if (props.isPassword) {
    //   //그냥 임의로.. 8자 이상
    //   if (inputText.length < 9) {
    //     setIsError(true);
    //     setErrorTxt('비밀번호는 8자 이상이어야 합니다.');
    //     return;
    //   }
    //   setIsError(false);
    // }

    //작성된게 있으면 검증로직
  };

  // 활성화시 애니메이션 추가
  const animatedTextTop = useRef(new Animated.Value(0)).current;

  // const [top,setTop] = useState(10)
  const top = animatedTextTop.interpolate({
    inputRange: [0, 1],
    outputRange: [10, 1],
  });

  //input text값을 입력하거나, active상태로 만들면 유효성검사 
  useEffect(()=>{

    if(inputText===""){
        setIsError(true)
        setErrorTxt(props.title+"값을 입력해주세요.")
        return
    }

    if (props.keyboardType === 'phone-pad') {
        if (!/^[0-9]*$/.test(inputText)) {
          setIsError(true);
          setErrorTxt('휴대폰 번호는 숫자로만 작성해주세요.');
          return;
        }
  
        if (inputText.length !== 11) {
          setIsError(true);
          setErrorTxt('유효한 휴대폰 번호가 아닙니다.');
          return;
        }
  
        setIsError(false);
      }
  
      //비밀번호
      if (props.isPassword) {
        //그냥 임의로.. 8자 이상
        if (inputText.length < 9) {
          setIsError(true);
          setErrorTxt('비밀번호는 8자 이상이어야 합니다.');
          return;
        }
        setIsError(false);
      }

        //비밀번호
      if (props.title === '인증번호') {
        //그냥 임의로.. 8자 이상
        if (inputText.length !== 6) {
          setIsError(true);
          setErrorTxt(props.title+'는 6자 입니다.');
          return;
        }
        setIsError(false);
      }

  },[inputText, isActive]) //isActive가 들어간 이유는 최초 터치시에는 inputText가 변하지 않아서...검사가안됨 

  useEffect(() => {

    if (isActive) {
      //에러인 경우 색상
      if (isError) {
        setBorderColor('#F06E6E');
      } else {
        // 에러 아닌 경우 색상처리
        setErrorTxt('');
        setBorderColor('#5E5656');
      }
      setTextColor('#5E5656');
      setTextSize(12);
      Animated.timing(animatedTextTop, {
        toValue: 1,
        duration: 180,
        useNativeDriver: false,
      }).start();

    } else {
      //inactive되었을때
      setErrorTxt('');
      setBorderColor('#D9D9D9');
      setTextColor('#D9D9D9');
      setTextSize(22);
      Animated.timing(animatedTextTop, {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }

    //유효한 필드값을 입력했는지
    if (isActive && !isError) {
      props.setValidation(true);
    } else {
      props.setValidation(false);
    }
  }, [animatedTextTop, isActive, isError]);

  useEffect(() => {
    if (isHide) {
      setHideImg(require('../../assets/images/eye_closed.png'));
    } else {
      setHideImg(require('../../assets/images/eye_open.png'));
    }
  }, [isHide]);


  useEffect(()=>{
    console.log("플로팅:",inputText)
    props.setInput(inputText)
  },[inputText])

  //log확인
  // useEffect(() => {
  //   // console.log('[error] : ' + isError);
  //   // console.log('[isActive]' + isActive);
  //   // console.log("isFocused : "+ isFocused)
  // });

  return (
    <View>
      <View style={[styles.txtBox, {borderColor: borderColor}]}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 3, flexDirection: 'column'}}>
            <Animated.Text
              style={[
                {
                  color: textColor,
                  fontSize: textSize,
                  top: top,
                },
              ]}>
              {props.title}
            </Animated.Text>
            <TextInput
              onFocus={() => setIsActive(true)}
              onBlur={onInActive}
              onChangeText={setInputText}
              value={inputText}
              keyboardType={props.keyboardType}
              style={[styles.inputTxt, {flex: 3, marginTop:-10}]} //인풋값 가려짐..
              secureTextEntry={isHide}
              autoCorrect={false}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            {props.isPassword && isActive && (
              <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                <Image
                  source={hideImg}
                  style={{width: 25, height: 25, marginRight: 10}}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Text style={styles.errorTxt}>{errorTxt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txtBox: {
    height: 54,
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
  },
  inputTxt: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorTxt: {
    color: '#F06E6E',
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 10,
  },
});

export default FloatingTitleTxtInput;
