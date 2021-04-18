/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DetailMessages = ({data}) => {
  const [message, setMessage] = useState();

  useEffect(() => {
    data && setMessage(data);
    console.log('called');
  }, []);
  return (
    <View style={styles.Container}>
      {message ? (
        <>
          <Text style={styles.HeadText2}>{message.title}</Text>
          <Text style={styles.MidText}>{message.body}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  HeadText2: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: 100 + '%',
    padding: 10,
  },
  MidText: {
    color: 'grey',
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '400',
  },
  Margin: {
    marginVertical: 20,
  },
  Mybutton2: {
    backgroundColor: 'rgb(71, 178, 228)',
    minWidth: 150,
    alignSelf: 'center',
    borderRadius: 20,
    margin: 2,
    color: '#ffffff',
  },
  Midtext2UnderLine: {
    color: 'grey',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default DetailMessages;
