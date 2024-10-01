//react import
import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

type TimerProps = {
  time: number; //
};

const Timer = (props: TimerProps) => {
  return <></>;
};

export default Timer;

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
