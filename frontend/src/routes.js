import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Forgot_pwd from "./pages/Forgot_pwd";
import Reset_pwd from "./pages/Reset_pwd";

export default function Routes() {
   return (
      <BrowserRouter>
         <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/index" component={Main} />
            <Route path="/forgot_pwd" component={Forgot_pwd} />
            <Route path="/reset_pwd" component={Reset_pwd} />
         </Switch>
      </BrowserRouter>
   );
}
