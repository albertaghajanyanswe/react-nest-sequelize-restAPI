import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CustomThemeProvider from './configs/themes/CustomThemeProvider';
import { SnackbarProvider } from 'notistack';
import { Box } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18n from './i18n';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CustomThemeProvider>
          <Box
            sx={{ justifyContent: 'center' }}
            component={SnackbarProvider}
            autoHideDuration={5000}
            hideIconVariant
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            maxSnack={4}
          >
            <App />
          </Box>
        </CustomThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
