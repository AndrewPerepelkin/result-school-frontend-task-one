import React from 'react';
import CommentsForm from './commentsForm';
import CommentsList from './commentsList';
// import PropTypes from 'prop-types'

const Comments = () => {
  return (
    <>
      <CommentsForm />
      <CommentsList />
    </>
  );
};

Comments.propTypes = {};

export default Comments;
