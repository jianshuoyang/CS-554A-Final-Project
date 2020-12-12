import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login/Login';
import Register from './components/Register/Register'

import AlbumList from './components/AlbumList'
import GenresList from './components/GenresList'
import PlayList from './components/PlayList'
import SongList from './components/SongList'
import Songplay from './components/SongPlay'

import { AppContext } from "./libs/contextLib";



function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const e = window.sessionStorage.getItem("userEmail");
  const [userEmail, setUserEmail]= useState(e);



  console.log("user email: " + userEmail);
  console.log("userHasAuthenticated: " + isAuthenticated);

  useEffect(() => {
    onLoadAgain();
  }, [e]);
  
  async function onLoadAgain() {
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
  const url = 'https://accounts.spotify.com/authorize?show_dialog=true&client_id=230be2f46909426b8b80cac36446b52a&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback';

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
                <p class = "login" style={{fontSize:'30px'}}> 
                      To logout you might need double click
                  </p>
                <p class = "login" style={{fontSize:'30px'}}> 
                      <a
                          href= "http://localhost:3000/register"
                      >
                          Register
                      </a>
                  </p>
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
                          Categories
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

                  <p class = "login" style={{fontSize:'30px'}}>

                  <a
                      href= {url}
                  >
                      Open Spotify Online
                  </a>

                
			</p>
                </div>
              )}
          </header>
          {/* Rupu's play components */}
          <Songplay></Songplay>


          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            {/* Yichao's routes */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/userprofile" component={UserProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            {/* Rupu's routes */}
            <Route exact path='/' component={GenresList} />
            <Route exact path='/:categories/playList' component={PlayList} />
            <Route exact path='/:type/songsList/:id' component={SongList} />
            <Route exact path='/albumList/:id' component={AlbumList} />
          </AppContext.Provider>

          


        </div>
      </Router>
    // )
  );
}

export default App;




