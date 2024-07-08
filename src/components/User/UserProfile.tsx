import styled from 'styled-components';
import logo from '../../assets/userProfile.gif';
import { useState } from 'react';
import PopOver from '../common/PopOver';
import { CgProfile } from 'react-icons/cg';
const UserProfile = () => {
  const [open, setOpen] = useState(false);
  return (
    <StyleUserProfile>
      <div className='icon'>
        <CgProfile size={34} onClick={() => setOpen(!open)} />
      </div>
      {open && <PopOver close={() => setOpen(false)} />}
    </StyleUserProfile>
  );
};

const StyleUserProfile = styled.div`
  cursor: pointer;
  position: relative;
  .icon {
    color: white;
  }
`;

export default UserProfile;
