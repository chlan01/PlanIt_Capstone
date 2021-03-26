import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../other/Alert';
import NotFound from '../other/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import Register from '../layout/Register';
import Login from '../layout/Login';
import Dashboard from '../layout/Dashboard';
import Board from '../layout/Board';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import Dashboards from '../dashboard/Dashboards';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Pom from '../pom-timer/Pom';



// Routes are protected and it always checks if the user is authenticated in order to navigate -- (see ./routing/PrivateRoute.js)

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
          <PrivateRoute exact path="/profdash" component={Dashboards} />
          <PrivateRoute exact path="/create-profile" component={ProfileForm} />
          <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
          <PrivateRoute exact path="/add-education" component={AddEducation} />
          <PrivateRoute exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/pomodoro" component={Pom} />
          <Route component={NotFound} />
        </Switch>
      </section>
    );
  };

export default Routes;