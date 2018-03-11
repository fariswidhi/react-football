import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LeagueTable from './components/LeagueTable';
import Home from './components/Home';
import Fixture from './components/Fixture';

class App extends Component {


  render() {


    return (
      <Router>
      <div className="App">
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to={'/'}>Football App</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>


</nav>

       
    <div className="container" style={{marginTop: 20}}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/:id/:fixture' component={Fixture} />
        <Route path='/:id' component={LeagueTable} />

      </Switch>
    </div>

  
      </div>
      </Router>
    );
  }
}

export default App;
