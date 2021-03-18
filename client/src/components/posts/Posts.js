import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Navbar from '../other/Navbar';
import { getPosts } from '../../actions/post';




const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <div className='dashboard-and-navbar'>
      <Navbar />
      <div className="containerB"> 
          <h1 className="large text-primary">Discussion Board</h1>
        <PostForm />
        <div className="posts">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
