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
import TopNav from './components/Nav/TopNav'
import { AppContext } from "./libs/contextLib";
import Search from './components/Search';
import LikedPage from './components/LikedPage';


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
  
  return (
    // !isAuthenticating && (
      <Router>
        <div>
        <TopNav></TopNav>
        <Songplay></Songplay>


          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            {/* Yichao's routes */}
            <Route exact path="/home" component={Home} />
            <Route exact path="/userprofile" component={UserProfile} />

            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* Weijie's routes */}
            <Route exact path="/likedpage" component={LikedPage} />

            {/* Rupu's routes */}
            <Route exact path='/' component={GenresList} />
            <Route exact path='/:categories/playList' component={PlayList} />
            <Route exact path='/:type/songsList/:id' component={SongList} />
            <Route exact path='/albumList/:id' component={AlbumList} />
            {/* Donglin's routes */}
            <Route exact path='/search' component={Search} />
          </AppContext.Provider>

          


        </div>
      </Router>
    // )
  );
}

export default App;




