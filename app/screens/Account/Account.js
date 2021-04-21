import React, { useState, useEffect } from "react";
import * as firebase from "firebase";
import Loading from "../../components/Loading/Loading";
import Login from "./Login/Login";
// import UserGuest from "./UserGuest/UserGuest";
import UserLogged from "./UserLogged/UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando..." />;

  return login ? <UserLogged /> : <Login />;
  // return login ? <UserLogged /> : <UserGuest />;
}
