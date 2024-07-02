import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div>헤더</div>
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
