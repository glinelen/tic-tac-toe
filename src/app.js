import React from 'react';
import Game from './game';
import GameSettings from './gameSettings';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
                        <Link to="/game">Новая Игра</Link>
                     </li>
                  </ul>
               </nav>

               <Switch>
                  
                  <Route exact path="/game" >
                     <GameSettings />
                  </Route>
                  <Route path="/games/:game" component={Game}>
                     
                  </Route>
                  <Route exact path="/">
                  </Route>
               </Switch>
            </div>
         </Router>
      )
   }
}
export default App;