import React, {Component} from 'react';
import {Switch, Route, HashRouter as Router} from 'react-router-dom';
import {PrivateRoute} from '../PrivateRoute';
import {PublicRoute} from '../PublicRoute';
import Home from '../Home/Home';
import Book from '../Books/Index';
import Video from '../Videos/Index';
import Slide from '../Slides/Index';
import Article from '../Articles/Index';
import Material from '../Materials/Index';
import Vacancy from '../Vacancy/Index';
import Scholarship from '../Scholarship/Index';
import Login from '../Login/Login';
import jwt from 'jsonwebtoken';
import {userActions} from '../../actions/UserActions';
import Cookie from "js.cookie";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore"; 

class App extends Component {
  render () {
    const token =  Cookie.get("accesstoken");
    if (token) {
      jwt.decode(token);
      jwt.verify(token, "Ob3Ha$0PxXCzSxs*a1nQoYxtxZDK37ZQCCr*acAO$e5&8pML^E$412rMVD0Q%XQQNVVq3z1i0$O0RGUau9%Q^GT1td7Y5uAYX@#",function(err, decode){
        if(err){
          userActions.logout();
        }
      });
    }
    return (
      <Router>
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
          <PrivateRoute exact path="/books" component={Book} />
          <PrivateRoute exact path="/videos" component={Video} />
          <PrivateRoute exact path="/slides" component={Slide} />
          <PrivateRoute exact path="/articles" component={Article} />
          <PrivateRoute exact path="/materials" component={Material} />
          <PrivateRoute exact path="/vacancies" component={Vacancy} />
          <PrivateRoute exact path="/scholarships" component={Scholarship} />
        </Switch>

      </Router>
    );
  }
}
export default App;
