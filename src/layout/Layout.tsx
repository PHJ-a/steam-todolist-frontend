import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

const Main = styled.div`
  max-width: 1800px;
  margin: 0 auto;
`;

export default Layout;
