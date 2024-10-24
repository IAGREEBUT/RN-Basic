//react import
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type BtnProps = {
  btnColor: string;
  btnTxtColor: string;
  btnTxt: string;
  disabled: boolean;
  onClicked?: any
};

const CustomButton = (props: BtnProps) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.mainBtn,
          {backgroundColor: props.disabled ? '#D9D9D9' : props.btnColor},
        ]}
        onPress={() => props.onClicked?.()}
        disabled={props.disabled}>
        <Text style={[styles.mainBtnTxt, {color: props.btnTxtColor}]}>
          {props.btnTxt}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
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
});
