import React, {useState, useEffect} from "react";
import './App.css';
import axios from 'axios'

function App() {

  const user = {
    firstName: 'xxx',
    lastName: 'xxx',
    gender: 'xxx',
    email: 'jianshuoy@gmail.com',
    password: '123123'
  }

  const whatever = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users/add', user);
  }

  return (
      <div>
        <button onClick={whatever}>addUser</button>
      </div>
  );
}

export default App;




