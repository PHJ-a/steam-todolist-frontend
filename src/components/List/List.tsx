import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import { Todo } from '../../models/type';
import ListItem from './ListItem';
import CreateButton from './CreateButton';
import { useNavigate } from 'react-router-dom';
import useModal from '../../hooks/useModal';
import ErrorModal from '../modal/ErrorModal';
import errorIcon from '../../assets/error.png';
import InfoModal from '../modal/infoModal';

type AchievementListProps = {
  todos: Todo[];
  handleRemove: (id: number) => void;
  handleUpdate: (id: number) => void;
};

const AchievementList = ({
  todos,
  handleRemove,
  handleUpdate,
}: AchievementListProps) => {
  const {
    open: errorOpen,
    openModal: openErrorModal,
    closeModal: closeErrorModal,
  } = useModal();
  const {
    open: infoOpen,
    openModal: openInfoModal,
    closeModal: closeInfoModal,
  } = useModal();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const navigateToCreate = () => {
    if (todos.length === 3) {
      openErrorModal();
      return;
    }

    const isChecked = localStorage.getItem('isChecked') === 'true';
    if (isChecked) {
      navigate('/create/games');
    } else {
      openInfoModal();
    }
  };

  return (
    <ListContainer>
      <div className='title'>
        <h2>도전과제 수</h2>
        <h2>{isLoggedIn ? todos.length : 0} / 3</h2>
      </div>

      {todos.map((todo, index) => (
        <ListItem
          key={index}
          todo={todo}
          isLoggedIn={isLoggedIn}
          handleRemove={handleRemove}
          handleUpdate={handleUpdate}
        />
      ))}
      {isLoggedIn && (
        <CreateButton onClick={navigateToCreate}>
          도전과제 생성 &nbsp;{todos.length}/3
        </CreateButton>
      )}
      <ErrorModal
        icon={errorIcon}
        open={errorOpen}
        close={closeErrorModal}
        title='도전과제 생성오류'
        message='최대 3개까지만 생성이 가능합니다'
      />
      <InfoModal open={infoOpen} close={closeInfoModal} />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #66c0f4;
  }
`;

export default AchievementList;
