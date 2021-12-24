import React from 'react';
import { useStore } from 'effector-react';
import { Route, Redirect } from 'react-router-dom';
import { GuestLayout } from 'src/ui/layouts/GuestLayout/GuaestLayout';
import { AuthorizedLayout } from 'src/ui/layouts/AuthorizedLayout/AuthorizedLayout';
import { $isAuthenticated } from 'src/models/Auth';


export const BasicRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useStore($isAuthenticated);
  return (
    (isAuthenticated
      ? (<Redirect to={{ pathname: '/default' }}/>)
      : (
        <Route
          {...rest}
          render={
              (props) => <GuestLayout><Component {...props} /></GuestLayout>
            }
        />
      ))
  );
};


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useStore($isAuthenticated);
  return (
    <Route
      {...rest}
      render={
        (props) => (isAuthenticated
          ? <AuthorizedLayout><Component {...props} /></AuthorizedLayout>
          : (<Redirect to={{ pathname: '/login', state: { from: props.location } }}/>))
      }
    />
  );
};