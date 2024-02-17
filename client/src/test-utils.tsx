import React, { ReactElement } from 'react';
import { RenderOptions, render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import CustomThemeProvider from './configs/themes/CustomThemeProvider';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';

const store = setupStore();

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <MemoryRouter>
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
            {children}
          </Box>
        </CustomThemeProvider>
      </MemoryRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender }