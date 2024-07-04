import styled from 'styled-components';
import icon from '../assets/Empty.png';

const Empty = ({ onLoginClick }: { onLoginClick: () => void }) => {
  return (
    <EmptyStateContainer>
      <img className='logo' src={icon} alt='Logo' />
      <p className='message'>로그인 후에 달력을 이용할 수 있습니다.</p>
      <button className='loginBtn' onClick={onLoginClick}>
        로그인
      </button>
    </EmptyStateContainer>
  );
};

const EmptyStateContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;

  align-items: center;
  height: 100%;
  background-color: #f2f2f2;
  .logo {
    width: 300px;
    height: 300px;
    margin-bottom: 20px;
  }
  .message {
    font-weight: 700;
    font-size: 30px;
    margin-bottom: 1rem;
  }
  .loginBtn {
    width: 200px;
    border-radius: 20px;
    margin-top: 20px;
    padding: 20px 20px;
    background-color: #1a73e8;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

export default Empty;
