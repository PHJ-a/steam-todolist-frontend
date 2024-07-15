import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AchievementsList from '../../components/Achievements/AchievementsList';
import Loading from '../../components/common/Loading';
import useSnackBar from '../../hooks/useSnackBar';
import useAchievements from '../../hooks/useAchievements';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import axios from 'axios';
// import useTodos from '../../hooks/useTodos';

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
  // const { todos } = useTodos();

  const { snackbar: existingTodoSnackbar, open: showExistingTodoSnackbar } =
    useSnackBar();
  const {
    snackbar: errorAddingTodoSnackbar,
    open: showErrorAddingTodoSnackbar,
  } = useSnackBar();

  const { snackbar: todoAddedSnackbar, open: showTodoAddedSnackbar } =
    useSnackBar();

  const buttonRef = useRef<HTMLDivElement>(null);

  // 도전과제 추가하기
  const handleCreateTodo = async () => {
    //  todo가 3개 이상인 경우
    // if (todos.length >= 3) {
    //   showTodoLimitSnackbar();
    //   return;
    // }

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

  // 도전과제 선택 시 버튼으로 스크롤 이동
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
    if (error) {
      return (
        <ErrorMessage>도전과제를 불러오는 중 문제가 발생했습니다.</ErrorMessage>
      );
    }

    if (achievements.length === 0 && !isLoading) {
      return <ErrorMessage>해당 게임은 도전과제가 없습니다.</ErrorMessage>;
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
        {existingTodoSnackbar}
        {errorAddingTodoSnackbar}
        {todoAddedSnackbar}
        {/* {todoLimitSnackbar} */}
      </>
    );
  };

  return (
    <AchievementsStyle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <Title>
        <h2>도전과제를 선택해 주세요.</h2>
        <GameImage>
          <img
            src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
            alt={game.name}
          />
        </GameImage>
        <h3>{game.name}</h3>
        <CompletionInfo>
          <span>
            {totalAchievements} 중 {completedAchievements} (
            {completionRate.toFixed(1)}%) 개의 도전과제 완료
          </span>
          <ProgressBar completionRate={completionRate} />
        </CompletionInfo>
      </Title>
      {renderContent()}
      {selectedAchievement && (
        <ButtonContainer ref={buttonRef} onClick={handleCreateTodo}>
          <button>선택한 도전과제 추가하기</button>
        </ButtonContainer>
      )}
    </AchievementsStyle>
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
`;

const GameImage = styled.div`
  height: 130px;

  img {
    height: 100%;
    border: 0;
    padding: 4px;
    margin: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const CompletionInfo = styled.div`
  text-align: center;
`;

const ProgressBar = styled.div<{ completionRate: number }>`
  background: #3a3a3a;
  padding: 1px;
  border: 1px solid #aeaeae;
  max-width: 300px;
  margin-top: 8px;

  &::after {
    content: '';
    display: block;
    background: #5f98d3;
    height: 8px;
    width: ${({ completionRate }) => `${completionRate}%`};
    transition: width 0.5s ease-in-out;
  }
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

const ErrorMessage = styled.span`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
`;

export default Achievements;
