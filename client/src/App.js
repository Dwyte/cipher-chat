import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "./components/footer";
import Chat from "./components/chat/chat";
import LoginForm from "./components/forms/login/loginForm";
import RegisterForm from "./components/forms/register/registerForm";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Redirect from="/" to="/login" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
