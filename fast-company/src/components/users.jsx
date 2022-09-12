import React from "react";
import User from "./user";

const Users = (props) => {
  const {users} = props;
  return (
    <>
      {!!users.length && 
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <User users={users} onDelete={props.onDelete} />
        </tbody>
      </table>
      }
    </>    
  );
};

export default Users;