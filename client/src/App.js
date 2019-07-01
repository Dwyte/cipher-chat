import React from "react";
import "./App.css";
import Footer from "./components/footer";
import Login from "./components/login";
import Register from "./components/register";
import { Switch, Route, Redirect } from "react-router-dom";
import Chat from "./components/chat/chat";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Redirect from="/" to="/chat" />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
