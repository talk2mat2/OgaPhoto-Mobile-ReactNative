/* eslint-disable prettier/prettier */
import React from 'react';
import {useDispatch} from 'react-redux';
import {LOGINOUTUSER} from '../redux/action';

const Logout = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(LOGINOUTUSER());
  }, []);

  return <></>;
};

export default Logout;
