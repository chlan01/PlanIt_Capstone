import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../other/Alert';
import NotFound from '../other/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Board from '../pages/Board';
import Posts from '../posts/Posts';
import Post from '../post/Post';

// Routes are protected and it always checks if the user is authenticated in order to navigate -- (see ../routing/PrivateRoute.js)

const Routes = props => {
    return (
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/board/:id" component={Board} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  };

export default Routes;