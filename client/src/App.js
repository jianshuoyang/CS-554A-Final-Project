import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register'

import { AppContext } from "./libs/contextLib";



function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  if (window.location.href.includes("access_token")) {
    return (
      <UserProfile />
        
    );
  }
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (

    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Router>
        <div>
          <header className="App-header">
            
            {isAuthenticated ? (
              <button
                  class="login" 
                  className="login"
                  onClick={handleLogout}
              >
                  Logout
              </button>
              ) : (
                <div>
                  <h1 className="App-title">
                    Welcome To Our Music Website
                  </h1>
                  <p class = "login" style={{fontSize:'30px'}}>

                      <a
                          href= "http://localhost:3000/login"
                      >
                          Login
                      </a>

                      
                  </p>
                  
                  <p class = "login" style={{fontSize:'30px'}}> 
                      <a
                          href= "http://localhost:3000/register"
                      >
                          Register
                      </a>
                  </p>
                </div>
              )}
          </header>
          <Route exact path="/" component={Home} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />


        </div>
      </Router>
    </AppContext.Provider>
      
  );
}

export default App;




