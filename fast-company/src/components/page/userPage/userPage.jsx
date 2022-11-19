import React, {useState, useEffect} from 'react';
import api from '../../../api';

import PropTypes from 'prop-types';
import ContainerWrapper from '../../common/container';
import UserCard from './userCard';
import QualitiesCard from './qualitiesCard';
import MeetingsCard from './meetingsCard';
import Comments from './comments/comments';

const UserPage = ({id}) => {
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(id).then((data) => setUser(data));
  }, []);

  return (
    <ContainerWrapper>
      <div className='row gutters-sm'>
        {user ? (
          <>
            <div className='col-md-4 mb-3'>
              <UserCard
                userName={user.name}
                professionName={user.profession.name}
                rate={user.rate}
              />
              <QualitiesCard qualities={user.qualities} />
              <MeetingsCard completedMeetings={user.completedMeetings} />
            </div>
            <div className='col-md-8'>
              <Comments />
            </div>
          </>
        ) : (
          <div className='m-3'>Loading...</div>
        )}
      </div>
    </ContainerWrapper>
  );
};

UserPage.propTypes = {
  id: PropTypes.string.isRequired
};

export default UserPage;
