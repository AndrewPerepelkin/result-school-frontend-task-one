import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';
import {ToastContainer} from 'react-toastify';
import {ProfessionProvider} from './hooks/useProfession';
import {QualitiesProvider} from './hooks/useQualities';
import {AuthProvider} from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logout';

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <Route
                path='/login/:type?'
                component={Login}
              />
              <Route
                path='/logout'
                component={LogOut}
              />
              <ProtectedRoute
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
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
};
export default App;
