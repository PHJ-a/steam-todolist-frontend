import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global';
import Layout from './layout/Layout';
import Home from './pages/Home';
import CompletedTodo from './pages/CompletedTodo';
import Games from './pages/CreateTodo/Games';
import Achievements from './pages/CreateTodo/Achievements';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index path='/' element={<Home />} />
              <Route path='/create/games' element={<Games />} />
              <Route path='/create/achievements' element={<Achievements />} />
              <Route path='/completed' element={<CompletedTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <div id='modalRoot' />
        <div id='snackbarRoot' />
      </QueryClientProvider>
    </div>
  );
};

export default App;
