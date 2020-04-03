import React from "react";
import { Link, useHistory } from "react-router-dom";

import { FiPower } from "react-icons/fi";

import "./styles.css";

import Header from "../../components/Header";

export default function Main() {
   const history = useHistory();

   function changePassword() {
      history.push("/forgot_pwd");
   }

   function handleLogout() {
      localStorage.clear();
      history.push("/login");
   }

   return (
      <div className="main-container">
         <Header />
         <div className="sub-container">
            <h1>Olá, {localStorage.getItem("userName")}!</h1>
            <p style={{ marginBottom: "16px" }}>
               Seu email é: {localStorage.getItem("userEmail")}.
            </p>
            <p>Este é um sistema para testar o backend da aplicação.</p>
            <p>Escolha uma das opções abaixo:</p>
            <button onClick={changePassword} className="button">
               Trocar senha
            </button>
            <Link to="/login" className="logout-button" onClick={handleLogout}>
               <FiPower size={20} color="#FFF" />
               Logout
            </Link>
         </div>
      </div>
   );
}
