import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {PrivateRoute} from '../PrivateRoute';
import LoginPage from '../Login/Login';
// import AdminLoginPage from '../Login/AdminLogin';
// import RegisterPage from '../Register/Register';
// import DetailedView from '../SpotsInformation/AdminView';
// import VehicleType from '../VehicleType/IndexVehicle';
// import Area from '../Area/IndexArea';
// import ReservationIndex from '../Reservation/IndexReservation';
// import UserReservation from '../Reservation/UserView';
// import Reservation from '../Reservation/ReservationView';
// import ReservationProvider from '../../contexts/ReservationContext';
// import IndexEmployee from '../Employee/IndexEmployee';
// import InvoiceIndex from '../Invoice/InvoiceIndex';
// import AreaRate from '../Rate/AreaRate';
// import Notification from '../Notification/AreaList';
// import UnauthorizedUser from '../UnauthorizedUser/UnauthorizedUserPage';
// import Board from '../Board/IndexBoard';
import Home from '../Home/Home';
// import ParkedVehicleIndex from '../ParkedVehicles/ParkedVehicleIndex';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            {/* <PrivateRoute
              exact
              path="/spot_information"
              component={DetailedView}
            />
            <PrivateRoute exact path="/vehicle-types" component={VehicleType} />
            <PrivateRoute exact path="/areas" component={Area} />
            <PrivateRoute
              exact
              path="/unauthorized"
              component={UnauthorizedUser}
            />
            <PrivateRoute exact path="/boards" component={Board} />
            <PrivateRoute exact path="/employees" component={IndexEmployee} />
            <PrivateRoute exact path="/invoice" component={InvoiceIndex} />
            <PrivateRoute exact path="/rates" component={AreaRate} />
            <PrivateRoute
              exact
              path="/notifications"
              component={Notification}
            />
            <PrivateRoute
              exact
              path="/reservations"
              component={ReservationIndex}
            />
            <PrivateRoute
              exact
              path="/reservations/user"
              component={UserReservation}
            />
            <PrivateRoute
              exact
              path="/reservation/create"
              component={Reservation}
            />
            <PrivateRoute
              exact
              path="/parked-vehicles"
              component={ParkedVehicleIndex}
            /> */}
        </Switch>
      </Router>
    );
  }
}
export default App;
