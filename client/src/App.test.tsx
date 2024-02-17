import React from 'react';
import { customRender as render } from './test-utils';
import App from './App';

test('init', async () => {
  render(<App />, {
})
  expect(1 + 2).toBe(3);
})



// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import CustomThemeProvider from './configs/themes/CustomThemeProvider';
// import { setupStore } from './store/store';
// import { Provider } from 'react-redux';
// const store = setupStore();

// test('init', async () => {
//   render(<App />, {
//     // wrapper: BrowserRouter
//     wrapper: ({ children }) => (
//       <Provider store={store}>
//       <BrowserRouter>
//         <CustomThemeProvider>{children}</CustomThemeProvider>
//       </BrowserRouter>
//       </Provider>
//     ),
//   })
//   expect(1 + 2).toBe(3);
// })
