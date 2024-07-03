import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyle } from './style/global';
import Layout from './layout/Layout';
import Home from './pages/Home';
import CreateTodo from './pages/CreateTodo';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/create' element={<CreateTodo />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <div id='modalRoot' />
    </div>
  );
};

export default App;