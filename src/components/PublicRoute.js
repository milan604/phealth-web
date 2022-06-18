import React from 'react';
import {Redirect, Route} from "react-router-dom";
import Cookie from "js.cookie";

export const PublicRoute = ({
    component: Component, ...rest
}) => (
    <Route
     {...rest}
     render = {props=>
     Cookie.get("accesstoken") ? (
         
         <Redirect 
         to={{
             pathname: "/home",
             state:{ from: props.location}
         }}
     />
     ):(
        <Component {...props} />
     )
        }
    />
);