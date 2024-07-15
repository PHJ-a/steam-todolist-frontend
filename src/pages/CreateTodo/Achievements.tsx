import styled from 'styled-components';
import useAchievements from '../../hooks/useAchievements';
import { useLocation, useNavigate } from 'react-router-dom';
import AchievementsList from '../../components/Achievements/AchievementsList';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axios';
import axios from 'axios';
import Loading from '../../components/common/Loading';
import useSnackBar from '../../hooks/useSnackBar';
import { useEffect, useRef } from 'react';
import useTodos from '../../hooks/useTodos';
// TODO: 게임 선택을 하지 않고 url로 직접 접근할 경우 예외처리 추가하기
function Achievements() {
  const location = useLocation();
  const game = location.state;
  const navigate = useNavigate();

  const {
    achievements,
    setSelectedAchievement,
    selectedAchievement,
    isLoading,
    error,
  } = useAchievements(game);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { snackbar: existingTodoSnackbar, open: showExistingTodoSnackbar } =
    useSnackBar();
  const {
    snackbar: errorAddingTodoSnackbar,
    open: showErrorAddingTodoSnackbar,
  } = useSnackBar();
  const { snackbar: todoAddedSnackbar, open: showTodoAddedSnackbar } =
    useSnackBar();
  const { snackbar: todoLimitSnackbar, open: showTodoLimitSnackbar } =
    useSnackBar();
  const { todos } = useTodos();

  // TODO : 현재 도전과제가 3개가 넘으면 예외처리 추가해 (API연결 후 작업)
  const handleCreateTodo = async () => {
    if (!todos) return;
    if (todos.length >= 3) {
      showTodoLimitSnackbar('도전과제는 최대 3개까지만 추가할 수 있습니다.');
      return;
    }
    if (selectedAchievement) {
      try {
        await axiosInstance.post('/todo', {
          id: selectedAchievement.id,
        });
        showTodoAddedSnackbar('도전과제가 추가되었습니다.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } catch (error) {
        if (
          axios.isAxiosError<{ message: string; statusCode: number }>(error) &&
          error.response
        ) {
          const { statusCode } = error.response.data;

          if (statusCode === 400) {
            showExistingTodoSnackbar('이미 진행중인 도전과제 입니다');
          }
        } else {
          showErrorAddingTodoSnackbar('도전과제 추가 중 문제가 발생했습니다.');
        }
      }
    }
  };

  useEffect(() => {
    if (selectedAchievement && buttonRef.current) {
      buttonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedAchievement]);

  // 도전과제 완료율 계산
  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter(
    (achievement) => achievement.achieved === 1,
  ).length;
  const completionRate =
    totalAchievements > 0
      ? (completedAchievements / totalAchievements) * 100
      : 0;

  const renderContent = () => {
    // 에러 발생 시
    if (error) {
      return (
        <ErrorContainer>
          <span>도전과제를 불러오는 중 문제가 발생했습니다.</span>
        </ErrorContainer>
      );
    }
    // 도전과제가 없을 때
    if (achievements.length === 0 && !isLoading) {
      return (
        <ErrorContainer>
          <span>해당 게임은 도전과제가 없습니다.</span>
        </ErrorContainer>
      );
    }

    return (
      <>
        {isLoading ? (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        ) : (
          <AchievementsList
            achievements={achievements}
            onSelect={setSelectedAchievement}
            isSelected={selectedAchievement}
          />
        )}
        {selectedAchievement && (
          <ButtonContainer ref={buttonRef} onClick={handleCreateTodo}>
            <button>선택한 도전과제 추가하기</button>
          </ButtonContainer>
        )}
        {existingTodoSnackbar}
        {errorAddingTodoSnackbar}
        {todoAddedSnackbar}
        {todoLimitSnackbar}
      </>
    );
  };

  return (
    game && (
      <AchievementsStyle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Title>
          <h2>도전과제를 선택해 주세요.</h2>
          <div className='game-img'>
            <img
              src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
              alt={game.name}
            />
          </div>
          <h3>{game.name}</h3>
          <div>
            <span>
              {totalAchievements} 중 {completedAchievements} (
              {completionRate.toFixed(1)}%) 개의 도전과제 완료
            </span>
            <ProgressBar $completionRate={completionRate} />
          </div>
        </Title>
        {renderContent()}
      </AchievementsStyle>
    )
  );
}

const AchievementsStyle = styled(motion.div)`
  width: 100%;
  padding-bottom: 20px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: #fff;

  h2,
  h3 {
    margin: 0;
  }

  .game-img {
    height: 100px;

    img {
      height: 100%;
      border: 0;
      padding: 4px;
      margin: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
`;

const ProgressBar = styled.div<{ $completionRate: number }>`
  background: #3a3a3a;
  padding: 1px;
  border: 1px solid #aeaeae;
  max-width: 300px;

  &::after {
    content: '';
    display: block;
    background: #5f98d3;
    height: 8px;
    width: ${({ $completionRate }) => `${$completionRate}%`};
    transition: width 0.5s ease-in-out;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #fff;
`;

const LoadingContainer = styled.div`
  margin-top: 40px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;

  button {
    background: #395061;
    color: #fff;
    border: 0;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #4a90e2;
    }
  }
`;

export default Achievements;
