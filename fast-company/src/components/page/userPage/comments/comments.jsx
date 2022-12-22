import React from 'react';
import {orderBy} from 'lodash';
import CardWrapper from '../../../common/Card';
import Divider from '../../../common/divider';
import CommentsForm from './addCommentsForm';
import CommentsList from './commentsList';
import {useComments} from '../../../../hooks/useComments';

const Comments = () => {
  const {createComment, deleteComment, comments} = useComments();

  const handleSubmit = (data) => {
    createComment(data);
  };

  const handleRemoveComment = (id) => {
    deleteComment(id);
  };

  const sortedComments = orderBy(comments, ['created_at'], ['desc']);

  return (
    <>
      <CardWrapper>
        <CommentsForm onSubmit={handleSubmit} />
      </CardWrapper>
      {sortedComments.length > 0 && (
        <CardWrapper>
          <h2>Comments</h2>
          <Divider />
          <CommentsList
            comments={sortedComments}
            onRemove={handleRemoveComment}
          />
        </CardWrapper>
      )}
    </>
  );
};

export default Comments;
