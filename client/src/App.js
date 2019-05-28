import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/element/home/Home';
import Header from './components/element/header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
          <div className='container-interior'>
            <Router>
              <Switch>
                <Route exact path='/' component={Home}/>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
