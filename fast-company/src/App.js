import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navBar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/users/:userId?' component={Users} />
        <Route path='/' component={Main} />
      </Switch>
    </>

  );
};
export default App;
