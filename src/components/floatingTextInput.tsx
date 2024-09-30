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
  TouchableOpacity
} from 'react-native';

type txtInputProps = {
    title:string;
    keyboardType:KeyboardTypeOptions;
    isPassword:boolean;
    //유효성 검사 로직을 함수로 받는게 나을듯...
}


const FloatingTitleTxtInput = (props: txtInputProps) => {
    // 텍스트 인풋 활성화여부
    const [isActive, setIsActive] = useState(false)

    // 디자인적 요소 
    const [borderColor, setBorderColor] = useState('#D9D9D9')
    const [textColor, setTextColor] = useState('#D9D9D9')
    const [textSize, setTextSize] = useState(22)

    //텍스트 박스 입력값 
    const [inputText, setInputText] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorTxt, setErrorTxt] = useState('')

    //비밀번호 입력인경우
    const [isHide, setIsHide] = useState(props.isPassword); //최초값은 비번이면 무조건 hide로 설정 
    const [hideImg, setHideImg] = useState(require('../../assets/images/eye_closed.png'))

    const onInActive = () => {
        //작성된게 없으면, inactive
        if(inputText === ''){
            setIsActive(false)
            setErrorTxt('')
            return
        }

        //active상태 -> 에러체크 
    
        if(props.keyboardType === 'phone-pad'){
            if(!/^[0-9]*$/.test(inputText)){
                setIsError(true)
                setErrorTxt('휴대폰 번호는 숫자로만 작성해주세요.')
                return
            }

            if(inputText.length !== 11){
                setIsError(true)
                setErrorTxt('유효한 휴대폰 번호가 아닙니다.')
                return
            }

            setIsError(false)
        }

        //비밀번호 
        if(props.keyboardType === 'default'){

        }
        
        //작성된게 있으면 검증로직
    }


    // 활성화시 애니메이션 추가
    const animatedTextTop = useRef(new Animated.Value(0)).current;

    // const [top,setTop] = useState(10)
    const top = animatedTextTop.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 1],
    })

    useEffect(()=>{

        if(isActive){
            //error는 active상태에서만 발생 
            if(isError){
                setBorderColor('#F06E6E')
                return
            }

            setErrorTxt('')
            setBorderColor('#5E5656')
            setTextColor('#5E5656')
            setTextSize(12)
            // setTop(0)
            Animated.timing(animatedTextTop, {
                toValue: 1,
                duration: 180,
                useNativeDriver: false,
              }).start();

        }else{
            setErrorTxt('')
            setBorderColor('#D9D9D9')
            setTextColor('#D9D9D9')
            setTextSize(22)
            // setTop(10)
            Animated.timing(animatedTextTop, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
              }).start();
        }

    },[isActive, isError])

    useEffect(()=>{
        if(isHide){
            setHideImg(require('../../assets/images/eye_closed.png'))
        }else{
            setHideImg(require('../../assets/images/eye_open.png'))
        }
    },[isHide])

    //log확인 
    useEffect(() => {
        console.log("[log]")
        console.log(isHide)
        // console.log("isFocused : "+ isFocused)

    })
    

    return(
        <View>
            <View style={[styles.txtBox, { borderColor: borderColor }]}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <View style={{flex:3, flexDirection: 'column'}}>
                        <Animated.Text style={[{color: textColor, fontSize: textSize, top: top}]}>{props.title}</Animated.Text>
                        <TextInput
                        onFocus={() => setIsActive(true)}
                        onBlur={onInActive}
                        onChangeText={setInputText}
                        value={inputText}
                        keyboardType={props.keyboardType}
                        style={[styles.inputTxt, {flex:3}]}
                        secureTextEntry={true}
                        autoCorrect={false}
                        />
                    </View>
                    <View style={{flex:1, alignItems:'flex-end', justifyContent:'center', backgroundColor:'red'}}>
                        {
                            props.isPassword &&
                            (
                                <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                                    <Image
                                        source={hideImg}
                                        style={{width: 30, height: 30}}
                                    />
                                </TouchableOpacity>
                            )
                        }  
                    </View>
                </View>
            </View>
            <Text style={styles.errorTxt}>{errorTxt}</Text>
        </View>
    )

}



const styles = StyleSheet.create({
    txtBox:{
        height: 54,
        borderRadius:2,
        borderStyle:'solid',
        borderWidth:1,
        paddingLeft:5,
        paddingRight:5,
        marginBottom:5,
    },
    inputTxt:{
        fontSize: 18,
        fontWeight:'bold'

    },
    errorTxt:{
        color:'#F06E6E',
        fontSize:12,
        fontWeight:'500'
    }
})

export default FloatingTitleTxtInput