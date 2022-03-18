import { useState } from "react";
import { Token } from "./App.types";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token") as string;
    console.log("attempting to obtain token locally");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: Token) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    console.log(`token set to ${userToken.token}`);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
