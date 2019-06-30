import React from 'react';
import './App.css';
import Profile from './components/profile/profile';
// import ChatList from './components/chatlist/chatList';
import Footer from './components/footer';
import ChatBox from './components/chatbox/chatbox';

function App() {
  return (
    <div className="app">
        <Profile/>

        <ChatBox/>

        <Footer />
    </div>
  );
}

export default App;
