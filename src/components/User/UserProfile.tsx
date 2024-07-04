import styled from 'styled-components';
import logo from '../../assets/userProfile.gif';
const UserProfile = () => {
  return (
    <StyleUserProfile>
      <img src={logo} />
    </StyleUserProfile>
  );
};

const StyleUserProfile = styled.div`
  margin-right: 40px;
  cursor: pointer;
`;

export default UserProfile;
