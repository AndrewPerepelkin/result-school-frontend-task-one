import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../../../api';
import {orderBy} from 'lodash';
import CardWrapper from '../../../common/Card';
import Divider from '../../../common/divider';
import CommentsForm from './addCommentsForm';
import CommentsList from './commentsList';

const Comments = () => {
  const {userId} = useParams();
  const [comments, setComments] = useState();

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  const handleSubmit = (data) => {
    api.comments
      .add({...data, pageId: userId})
      .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComment = (id) => {
    api.comments.remove(id).then((data) => setComments(data));
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
