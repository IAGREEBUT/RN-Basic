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
} from 'react-native';

type txtInputProps = {
    title:string;
    keyboardType:KeyboardTypeOptions;
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

    const onInActive = () => {
        if(inputText === '') setIsActive(false)
    }


    // 활성화시 애니메이션 추가
    const animatedTextTop = useRef(new Animated.Value(0)).current;

    const top = animatedTextTop.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 1],
    })

    useEffect(()=>{
        
        if(isActive){
            setBorderColor('#5E5656')
            setTextColor('#5E5656')
            setTextSize(12)
            Animated.timing(animatedTextTop, {
                toValue: 1,
                duration: 180,
                useNativeDriver: false,
              }).start();
        }else{
            setBorderColor('#D9D9D9')
            setTextColor('#D9D9D9')
            setTextSize(22)
            Animated.timing(animatedTextTop, {
                toValue: 0,
                duration: 180,
                useNativeDriver: false,
              }).start();
        }


    },[isActive])


    //log확인 
    useEffect(() => {
        console.log("[log]")
        console.log(inputText)
        // console.log("isFocused : "+ isFocused)

    })
    

    return(
        <View style={[styles.txtBox, { borderColor: borderColor }]}>
            <Animated.Text style={[{color: textColor, fontSize: textSize, top: top}]}>{props.title}</Animated.Text>
            <TextInput
                onFocus={() => setIsActive(true)}
                onBlur={onInActive}
                onChangeText={setInputText}
                value={inputText}
                keyboardType={props.keyboardType}
                />
        </View>
    )

}



const styles = StyleSheet.create({
    txtBox:{
        height: 54,
        borderRadius:2,
        borderStyle:'solid',
        borderWidth:1,
    },
})

export default FloatingTitleTxtInput