import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'; 
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import ProfileboardActions from '../profileboard/ProfileboardActions';
import Experience from '../profileboard/Experience';
import Education from '../profileboard/Education';

import '../other/test.css';


const Profileboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile }
  }) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);
  
    return (
      
      <Fragment>
        <h1 className="large text-primary">Profile Board</h1>
        <p className="lead">
          <i className="fas fa-user" /> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <ProfileboardActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
  
            <div className="my-2">
              <button className="btn btn-danger" onClick={() => deleteAccount()}>
                <i className="fas fa-user-minus" /> Delete My Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    );
  };
  
  Profileboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Profileboard
  );