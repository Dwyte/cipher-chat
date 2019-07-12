import React from "react";
import "./App.css";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import { Switch, Route, Redirect } from "react-router-dom";
import Chat from "./components/chat/chat";

function App() {
  const checkCurrentUser = () => {
    const aUserIsLoggedIn =
      localStorage.getItem("pvk_phrase") && localStorage.getItem("userToken");

    return Boolean(aUserIsLoggedIn);
  };

  return (
    <div className="app">
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {checkCurrentUser() ? <Redirect from="/" to="/chat" /> : ""}
        <Redirect from="/" to="/login" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
