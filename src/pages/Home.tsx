import TodoModal from '../components/modal/TodoModal';
import useModal from '../hooks/useModal';
import { ModalData } from '../models/type';

const Home = () => {
  const { open, openModal, closeModal } = useModal();
  const data: ModalData = {
    gameName: `엘든링`,
    gameImage: '../assets/eldenring.jpg',
    achievementTitle: '엘든링 도전과제',
    achievementDesc:
      'Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    isCompleted: false,
    progress: 45,
    icon: '',
  };
  return (
    <div>
      <button onClick={openModal}>모달열기</button>
      <TodoModal open={open} close={closeModal} data={data} />
    </div>
  );
};

export default Home;
