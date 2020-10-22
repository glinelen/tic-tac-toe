import React from 'react';
import Game from './game';
import {BrowserRouter as  Router, Switch, Route, Link } from 'react-router-dom';

class App extends React.Component {
    render() {
       return (
         <Router >
         <div>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>           
                    <li>
                      <Link to="/game">Game</Link>
                    </li>
                  </ul>
                </nav>
            
            <Switch>              
              <Route path="/game" >
                <Game />
              </Route>
              <Route path="/">                
              </Route>
            </Switch>
            </div>
          </Router>
       )
    }
 }
 export default App;