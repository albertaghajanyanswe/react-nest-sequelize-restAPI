import React from 'react';
import { fireEvent, customRender as render, screen, waitFor } from '../../../test-utils';
import LoginPage from '../LoginPage';
import i18n from "../../../i18n";
import userEvent from '@testing-library/user-event';

describe('LoginPage', () => {
  it('Validate LoginPage component texts', () => {
    render(<LoginPage />, {});
    expect(screen.getByText(i18n.t('login.title'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.email'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.password'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.signInGuest'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.createAccount'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.register'))).toBeInTheDocument();
    expect(screen.getByText(i18n.t('login.registerGuest'))).toBeInTheDocument();
  })
  it('Invalid login', async () => {
    render(<LoginPage />, {});
    const emailInp = screen.getByTestId('email');
    const passwordInp = screen.getByTestId('password');
    const submitBtn = screen.getByTestId('login-submit');
    expect(emailInp).toBeInTheDocument();
    expect(passwordInp).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    userEvent.type(emailInp, 'test1@yopmail.com');
    userEvent.type(passwordInp, '111111');
    userEvent.click(submitBtn);
    await waitFor(() => {
      const errorTxt = screen.getByText(/Could not find the user./i);
      expect(errorTxt).toBeInTheDocument();
    });
  })
})


// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import LoginPage from '../LoginPage';
// import { setupStore } from '../../../store/store';
// import CustomThemeProvider from '../../../configs/themes/CustomThemeProvider';
// import i18n from "../../../i18n";
// const store = setupStore();

// describe('LoginPage', () => {
//   it('Validate LoginPage component texts', () => {
//     render(<LoginPage />, {
//       // wrapper: BrowserRouter
//       wrapper: ({ children }) => (
//         <Provider store={store}>
//         <BrowserRouter>
//           <CustomThemeProvider>{children}</CustomThemeProvider>
//         </BrowserRouter>
//         </Provider>
//       ),
//     });
//     expect(screen.getByText(i18n.t('login.title'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.email'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.password'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.signInGuest'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.createAccount'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.register'))).toBeInTheDocument();
//     expect(screen.getByText(i18n.t('login.registerGuest'))).toBeInTheDocument();
//   })
// })
