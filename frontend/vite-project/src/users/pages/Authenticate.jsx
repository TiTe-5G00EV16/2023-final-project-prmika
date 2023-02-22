
import React, { useRef } from "react";
import { useMutation } from "react-query";

import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";

import { signUpUser } from "../api/users";
import './Authenticate.css';

const Authenticate = props => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();



    const signUpUserMutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: (data) => {
            // Will execute only once, for the last mutation,
            // regardless which mutation resolves first
            console.log(data);
        },
        onError: (error) => {
            // An error happened!
            console.log(error);
        }
    });

    const onSubmitHandler = event => {
        event.preventDefault();

        signUpUserMutation.mutate({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        <Card className="authentication">
            <h2>Sign Up</h2>
            <form onSubmit={onSubmitHandler}>
                <Input id="name" ref={nameRef} type="text" label="Name" />
                <Input id="email" ref={emailRef} type="text" label="Email" />
                <Input id="password" ref={passwordRef} type="password" label="Password" />
                <Button type="submit">SIGNUP</Button>
            </form>
        </Card>
    )
};

export default Authenticate;