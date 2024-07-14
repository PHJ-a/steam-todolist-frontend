import styled from 'styled-components';
import logo from '../../assets/steam.png';
import UserProfile from '../User/UserProfile';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Link to='/'>
          <h1>
            <img src={logo} alt='logo' className='logo' />
            Steam Todo
          </h1>
        </Link>
      </LogoContainer>
      <UserProfile />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  margin: 0 auto;
  padding: 10px 26px;
  display: flex;
  align-items: center;
  background-color: #171d25;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

const LogoContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: white;
  }

  h1 {
    gap: 5px;
    display: flex;
    align-items: center;
    font-size: 24px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  .logo {
    height: 50px;
    margin-right: 10px;
  }
`;

export default Header;
