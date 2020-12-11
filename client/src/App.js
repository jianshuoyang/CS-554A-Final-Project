import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register'

import { AppContext } from "./libs/contextLib";
// import { Auth } from "aws-amplify";



function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const e = window.sessionStorage.getItem("userEmail");
  const [userEmail, setUserEmail]= useState(e);



  console.log("user email: " + userEmail);
  console.log("userHasAuthenticated: " + isAuthenticated);
  // console.log("isAuthenticating: " + isAuthenticating);


  // useEffect(() => {
  //   onLoad();
  // }, []);
  
  // async function onLoad() {
  //   if (userEmail) {
  //     setIsAuthenticating(false);
  //   }else {
  //     alert("no current user");
  //     setIsAuthenticating(true);

  //   }

  // }

  useEffect(() => {
    onLoadAgain();
  }, [e]);
  
  async function onLoadAgain() {
    // console.log("check email status: " + userEmail);
    if (userEmail) {
      userHasAuthenticated(true);
    }else{
      console.log("user email is empty");
      userHasAuthenticated(false);
    }

  }

  if (window.location.href.includes("access_token")) {
    return (
      <UserProfile />
        
    );
  }
  function handleLogout() {
    window.sessionStorage.setItem("userEmail", "");
    userHasAuthenticated(false);
    
  }
  
  return (
    // !isAuthenticating && (
      <Router>
        <div>
          <header className="App-header">
            
            {(isAuthenticated) ? (
              <div>
                <button
                    class="login" 
                    className="login"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {/* <p class = "login" style={{fontSize:'30px'}}>
                  
                  Welcome! {userEmail}
                
                </p>
                <p class = "login" style={{fontSize:'30px'}}>
                  
                  <a
                      href= "http://localhost:3000/"
                  >
                      Home
                  </a>
                
                </p> */}
              </div>  
              ) : (
                <div>
                  <h1 className="App-title">
                    Welcome To Our Music Website
                  </h1>
                  <p class = "login" style={{fontSize:'30px'}}>

                      <a
                          href= "http://localhost:3000/"
                      >
                          Home
                      </a>

                      
                  </p>
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
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>

            <Route exact path="/" component={Home} />
            <Route exact path="/userprofile" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </AppContext.Provider>

          


        </div>
      </Router>
    // )
  );
}

export default App;




