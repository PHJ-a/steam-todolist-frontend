import styled from 'styled-components';
import logo from '../../assets/steam.png';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { isLoggedIn } = useAuth();
  const handleLogin = async () => {
    try {
      window.location.href = `http://localhost:4000/login?returnTo=${encodeURIComponent(
        'http://localhost:5173',
      )}`;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeaderContainer>
      <img src={logo} alt='logo' className='logo' />
      <LoginButton onClick={handleLogin}>
        {isLoggedIn ? '스팀 로그아웃' : '스팀 로그인'}
      </LoginButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  max-width: 1800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #282c34;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  .logo {
    height: 50px;
  }
`;

const LoginButton = styled.button`
  background-color: #61dafb;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #21a1f1;
  }
`;

export default Header;
