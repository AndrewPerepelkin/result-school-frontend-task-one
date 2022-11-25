import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import {ToastContainer} from 'react-toastify';
import {ProfessionProvider} from './hooks/useProfession';

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <Switch>
          <Route
            path='/login/:type?'
            component={Login}
          />
          <Route
            path='/users/:userId?/:edit?'
            component={Users}
          />
          <Route
            path='/'
            component={Main}
            exact
          />
          <Redirect to='/' />
        </Switch>
      </ProfessionProvider>
      <ToastContainer />
    </>
  );
};
export default App;
