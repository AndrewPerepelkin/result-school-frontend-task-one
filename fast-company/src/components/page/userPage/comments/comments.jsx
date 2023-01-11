import React, {useEffect} from 'react';
import {orderBy} from 'lodash';
import CardWrapper from '../../../common/Card';
import Divider from '../../../common/divider';
import CommentsForm from './addCommentsForm';
import CommentsList from './commentsList';
import {useComments} from '../../../../hooks/useComments';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../../../store/comments';

const Comments = () => {
  const {userId} = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const comments = useSelector(getComments());
  const {createComment, deleteComment} = useComments();

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
          {!isLoading ? (
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          ) : (
            'Загрузка...'
          )}
        </CardWrapper>
      )}
    </>
  );
};

export default Comments;
