"use client"

import React, { useState, Fragment } from 'react';
import LoginForm from './Login';
import SignUpForm from './Register';
import styles from './AuthComponent.module.css'; 

interface AuthFormSwitcherProps {
  initialForm: 'login' | 'register';
}

const AuthFormSwitcher: React.FC<AuthFormSwitcherProps> = ({ initialForm }) => {
  // Set initial state based on the `initialForm` prop
  const [isLogin, setIsLogin] = useState(initialForm === 'login');

  const switchForm = () => setIsLogin(!isLogin);

  return (
    <>
      {isLogin ? (
        <LoginForm onSwitchToSignUp={switchForm} />
      ) : (
        <SignUpForm onSwitch={switchForm} />
      )}
    </>
  );
};

export default AuthFormSwitcher;

