import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
// import {PrivateRoute} from '../PrivateRoute';
// import LoginPage from '../Login/Login';
// import RegisterPage from '../Register/Register';
// import UnauthorizedUser from '../UnauthorizedUser/UnauthorizedUserPage';
import Home from '../Home/Home';
import Book from '../Books/Index';
import Video from '../Videos/Index';
import Slide from '../Slides/Index';
import Article from '../Articles/Index';
import Material from '../Materials/Index';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/books" component={Book} />
          <Route exact path="/videos" component={Video} />
          <Route exact path="/slides" component={Slide} />
          <Route exact path="/articles" component={Article} />
          <Route exact path="/materials" component={Material} />
          


          {/* <PrivateRoute exact path="/" component={Home} /> */}
        </Switch>
      </Router>
    );
  }
}
export default App;
