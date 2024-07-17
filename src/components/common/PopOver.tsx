import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axiosInstance from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type PopOverProps = {
  close: () => void;
};

const PopOver = ({ close }: PopOverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/logout');
      close();
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError<{ message: string }>(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [close]);

  const handleNavigate = () => {
    navigate('/completed');
    close();
  };
  return (
    <StyledPopOver ref={popoverRef} onClick={(e) => e.stopPropagation()}>
      <ul className='menus'>
        <li onClick={handleLogout}>로그아웃</li>
        <li onClick={handleNavigate}>완료한 도전과제</li>
      </ul>
    </StyledPopOver>
  );
};

const StyledPopOver = styled.div`
  position: absolute;
  z-index: 100;
  width: 220px;
  background-color: #fff;
  color: black;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  top: calc(100% + 10px);
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .menus {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;

    li {
      padding: 8px 10px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
`;

export default PopOver;
