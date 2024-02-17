import React, { useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
// import { useSnackbar } from 'notistack';
// import { useTheme } from '@mui/system';
// import ChangeLanguage from './components/changeLanguage';
// import ChangeTheme from './components/chamgeTheme';
// import CustomButton from './components/customButton';
// import SystemMessage from './components/systemMessage';
import AppRouter from './AppRouter';

function App() {

  // const { enqueueSnackbar } = useSnackbar();
  // const theme = useTheme();

  const [queryClient] = useState(() => new QueryClient({
    queryCache: new QueryCache({}),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
        retry: () => false,
      }
    }
  }));

  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      {/* <ChangeLanguage />
      <ChangeTheme />
      <CustomButton
        label={'NOTIFY'}
        btnType='primary'
        sx={{ width: '100%', p: '8px 12px', fontSize: '16px', lineHeight: '24px', fontWeight: 600 }}
        onClick={() => {
          SystemMessage(enqueueSnackbar, 'Success', { variant: 'success', theme });
          SystemMessage(enqueueSnackbar, 'Error', { variant: 'error', theme });
          SystemMessage(enqueueSnackbar, 'Warn', { variant: 'warning', theme });
          SystemMessage(enqueueSnackbar, 'Info', { variant: 'info', theme });
        }}
      /> */}
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </div>
  );
}

export default App;
