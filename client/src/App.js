import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';





function App() {

 
  return (
      <Router>
        <div>
          <header className="App-header">
            <h1 className="App-title">
            Welcome To Our Music Website
            </h1>
            
          </header>
          <Route exact path="/" component={Home} />
          
        </div>
      </Router>
  );
}

export default App;
