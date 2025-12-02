// // import { StrictMode } from 'react';
// // import { createRoot } from 'react-dom/client';
// // import { Provider } from 'react-redux';
// // import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// // import { store } from './store';
// // import './index.css';
// // import App from './App.tsx';

// // const queryClient = new QueryClient({
// //   defaultOptions: {
// //     queries: {
// //       refetchOnWindowFocus: false, // Opsi UX standar
// //       retryyb: 1,
// //     },
// //   },
// // });

// // createRoot(document.getElementById('root')!).render(
// //   <StrictMode>
// //     <Provider store={store}>
// //       <QueryClientProviderZF client={queryClient}>
// //         <App />
// //       </QueryClientProvider>
// //     </Provider>
// //   </StrictMode>,
// // );


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { store } from './store';
// import './index.css';
// import App from './App';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// });

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </Provider>
//   </StrictMode>,
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { store } from './store';
import './index.css';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {/* Bungkus App dengan BrowserRouter */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);