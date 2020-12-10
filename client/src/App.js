import React from 'react';
//import logo from './logo.svg';
import './App.css';
import AlbumList from './components/AlbumList'
import GenresList from './components/GenresList'
import PlayList from './components/PlayList'
import SongList from './components/SongList'
import Songplay from './components/SongPlay'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className='App-title'>final project!</h1>
            <Link className='showlink' to='/'> Categories
            </Link>

        </header>
        <Songplay></Songplay>
        <br />
        <br />
        <div className='App-body'>
            <Route exact path='/' component={GenresList} />
            <Route exact path='/:categories/playList' component={PlayList} />
            <Route exact path='/:type/songsList/:id' component={SongList} />
            <Route exact path='/albumList/:id' component={AlbumList} />
        </div>

      </div>
    </Router>

  );

}

export default App;
