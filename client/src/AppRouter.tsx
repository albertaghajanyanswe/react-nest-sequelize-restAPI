import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pageComponents/login/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from './pageComponents/home/HomePage';
import { routes } from './configs';
import RegistrationPage from './pageComponents/registration/RegistrationPage';
import LoginGuestPage from './pageComponents/login/LoginGuestPage';
import RegistrationGuestPage from './pageComponents/registration/RegistrationGuestPage';
import NotFound from './components/NotFound';
import UsersPage from './pageComponents/users';
import SettingsPage from './pageComponents/settings/SettingsPage';
import Layout from './components/Layout';
import ProductsPage from './pageComponents/Products';
import ProductItemPage from './pageComponents/ProductItem/ProductItemPage';

function AppRouter() {

  return (
    <Routes>
      <Route path={routes.login.path} element={<LoginPage />} />
      <Route path={routes.loginGuest.path} element={<LoginGuestPage />} />
      <Route path={routes.registration.path} element={<RegistrationPage />} />
      <Route path={routes.registrationGuest.path} element={<RegistrationGuestPage />} />
      {/* <Route path={routes.registration.path} element={<RegistrationPage />} />
        <Route path={routes.registrationGuest.path} element={<RegistrationPage />} /> */}
      <Route
        path={routes.home.path}
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.users.path}
        element={
          <PrivateRoute>
            <UsersPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.products.path}
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.productCreate.path}
        element={
          <PrivateRoute>
            <ProductItemPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.productEdit.path}
        element={
          <PrivateRoute>
            <ProductItemPage />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.settings.path}
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

export default AppRouter;
