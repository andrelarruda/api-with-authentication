import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";

export default function Forgot_pwd() {
   const [email, setEmail] = useState("");

   const history = useHistory();

   async function handleForgot(e) {
      e.preventDefault();

      // apaga a cache para o caso do usuário ter clicado em 'trocar senha' na página Main. (Deve ser feita uma página para 'troca de senha'. Forgot_password é referente à 'esqueci a senha' (quando o usuário ainda não está logado.))
      localStorage.clear();

      try {
         const response = await api.post("/auth/forgot_password", {
            email,
         });

         console.log(response.data);

         alert(
            `Um email foi enviado para ${email} contendo o token de acesso necessário para resetar a sua senha.`
         );

         history.push("/reset_pwd", { email });
      } catch (error) {
         console.log(error);
         alert("Não foi possível enviar as informações. Tente novamente.");
      }
   }

   return (
      <div className="container">
         <h1>Esqueceu a sua senha?</h1>
         <p className="subtitle">
            Informe seu endereço de email e enviaremos um e-mail com as
            instruções para a recuperação da sua senha.
         </p>

         <form onSubmit={handleForgot}>
            <input
               placeholder="Email"
               type="email"
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
            <button className="button" type="submit">
               Enviar instruções
            </button>

            <p>Já possui conta?</p>
            <Link className="back-link" to="/login">
               <FiLogIn color="#22222e" size={16} />
               Acessar conta
            </Link>
         </form>
      </div>
   );
}
