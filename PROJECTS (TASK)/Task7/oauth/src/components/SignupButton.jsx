import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './LoginButton.css'

const SignupButton = () => {
    const { user, loginWithRedirect } = useAuth0();
    console.log(user)

    return <button onClick={() => loginWithRedirect()}>Signup</button>;
};

export default SignupButton;