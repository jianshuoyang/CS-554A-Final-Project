import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';





function App() {

  if (window.location.href.includes("access_token")) {
    return (
      <UserProfile />
        
    );
  }

  return (
      <Router>
        <div>
          <header className="App-header">
            <h1 className="App-title">
            Welcome To Our Music Website
            </h1>
            
          </header>
          <Route exact path="/" component={Home} />
          <Route exact path="/userprofile" component={UserProfile} />
        </div>
      </Router>
  );
}

export default App;




