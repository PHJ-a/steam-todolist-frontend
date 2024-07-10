import styled from 'styled-components';
import logo from '../../assets/steam.png';
import { useAuth } from '../../context/AuthContext';
import UserProfile from '../User/UserProfile';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const handleLogin = async () => {
    try {
      window.location.href = `http://localhost:9999/login?returnTo=${encodeURIComponent(
        'http://localhost:5173',
      )}`;
    } catch (e) {
      console.log(e);
    }
  };

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
      (
      <UserProfile />)
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

const LoginButton = styled.button`
  background-color: rgba(103, 112, 123, 0.2);
  border: none;
  border-radius: 3px;
  padding: 10px 20px;
  color: #c7d5e0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border 0.3s ease;

  &:hover {
    background-color: rgb(61, 68, 80);
    color: white;
  }
`;

export default Header;
