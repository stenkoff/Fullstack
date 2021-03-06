import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn, exact}) => {
  return (
  <Route exact={exact} path={path} render={(props) => (
    !loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/browse" />
    )
  )}/>
);
};

const Protected = ({component: Component, path, loggedIn, exact}) => {
  return (
    <Route exact={exact} path={path} render={(props) => {
      let component;
      if (loggedIn) {
        component = <Component {...props}/>
      } else {
        component = <Redirect to="/login"/>
      }
      return component
    }}/>
  )
};

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.currentUser)};
};

export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
