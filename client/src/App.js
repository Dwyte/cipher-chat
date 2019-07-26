import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/footer";
import Chat from "./components/chat/chat";
import LoginForm from "./components/forms/login/loginForm";
import RegisterForm from "./components/forms/register/registerForm";
import styled from "styled-components";

const AppDiv = styled.div`
  display: inline-block;
  max-width: 400px;
  width: 100%;

  * {
    border-radius: 5px;
  }

  a {
    font-size: 12px;
    color: #2e2e2e;
  }
`;

function App() {
  return (
    <AppDiv>
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Redirect from="/" to="/login" />
      </Switch>
      <Footer />
    </AppDiv>
  );
}

export default App;
