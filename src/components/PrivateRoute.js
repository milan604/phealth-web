import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Cookie from "js.cookie";

export const PrivateRoute = ({
    component: Component, ...rest
}) => (
    <Route
     {...rest}
     render = {props=>
     Cookie.get("accesstoken") ? (
         <Component {...props} />
     ):(
         <Redirect 
         to={{
             pathname: "/",
             state:{ from: props.location}
         }}
     />
     )
        }
    />
);