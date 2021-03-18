import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  return (
    <nav className='navbar'>
      <Link to='/dashboard'>Boards</Link>
      <Link to='/posts'>Posts</Link>
      <Link to='/profdash'>My Profile</Link>
      <Link to='/profiles'>Browse Members</Link>
      <Link to='/'>Timer</Link>
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
