import React, { useContext, useRef, useState } from "react";
import { useMutation } from "react-query";

import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";

import { loginUser, resetPassword, signUpUser } from "../api/users";
import "./Authenticate.css";
import { AuthContext } from "../../shared/context/auth-context";
import Modal from "../../shared/components/modal/Modal";


const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const email2Ref = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();

  const [isLoginMode, setLoginMode] = useState(true);
  const [showResetModal, setShowResetModal] = useState(false);

  const showResetHandler = () => setShowResetModal(true);
  const cancelResetHandler = () => setShowResetModal(false);

  const switchModeHanlder = () => {
    setLoginMode((prevMode) => !prevMode);
  };

  const auth = useContext(AuthContext);

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log('Password changed');
      console.log(data);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });
  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      auth.login(data.id, data.token);
      console.log(data);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      auth.login(data.id, data.token);
      console.log(data);
    },
    onError: (error) => {
      // An error happened!
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };
  const resetPasswordHandler = (event) => {
    event.preventDefault();

    resetPasswordMutation.mutate({
      email: email2Ref.current.value,
      password: password2Ref.current.value,
    });
    setShowResetModal(false);
  }

  return (
    <>
    <Modal
        show={showResetModal}
        header=""
        footerClass="place-item__modal-actions"
        footer={
          <>
            <p>forgot password?</p>
            <Input id="email2" ref={email2Ref} type="text" label="Email" />
            <Input id="password2" ref={password2Ref} type="text" label="new password" />
            <Button onClick={resetPasswordHandler}>Reset password</Button>
            <Button inverse onClick={cancelResetHandler}>Cancel</Button>
          </>
        }
      >
      </Modal>
      <Card className="authentication">
        <h2>{isLoginMode ? "LOGIN" : "SIGNUP"}</h2>
        <form onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <Input id="name" ref={nameRef} type="text" label="Name" />
          )}
          <Input id="email" ref={emailRef} type="text" label="Email" />
          <Input
            id="password"
            ref={passwordRef}
            type="password"
            label="Password"
          />

          <Button type="submit" disable={signUpUserMutation.isLoading}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <p>{isLoginMode ? "Not a user yet?" : "Allready a user?"}</p>
        <Button inverse onClick={switchModeHanlder}>
          {isLoginMode ? "SignUp" : "Login"} instead?
        </Button>
        {isLoginMode ?
            <Button onClick={showResetHandler}>Reset password</Button>
        : ''}
      </Card>
      <br />

    </>
  );
};

export default Authenticate;
