import React from 'react';
import './App.css';
import Profile from './components/profile/profile';
import ChatList from './components/chatlist/chatList';
import Footer from './components/footer';

function App() {
  return (
    <div className="app">
        <Profile/>

        <ChatList/>

        <Footer />
    </div>
  );
}

export default App;
