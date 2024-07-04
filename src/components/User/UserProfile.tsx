import styled from 'styled-components';
import logo from '../../assets/userProfile.gif';
import { useState } from 'react';
import PopOver from '../common/PopOver';
const UserProfile = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyleUserProfile>
      <img src={logo} onClick={() => setOpen((prev) => !prev)} />
      {open && <PopOver close={() => setOpen(false)} />}
    </StyleUserProfile>
  );
};

const StyleUserProfile = styled.div`
  margin-right: 40px;
  cursor: pointer;
  position: relative;
`;

export default UserProfile;
