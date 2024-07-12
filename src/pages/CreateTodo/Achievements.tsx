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
import icon from '../../assets/SnackBarIcon.png';
import useTodos from '../../hooks/useTodos';

function Achievements() {
  const location = useLocation();
  const game = location.state;
  const navigate = useNavigate();
  const {
    achievements,
    setSelectedAchievement,
    selectedAchievement,
    isLoading,
  } = useAchievements(game);
  const { todos } = useTodos();

  const { snackbar: existingTodoSnackbar, open: showExistingTodoSnackbar } =
    useSnackBar(
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={icon} width={50} height={50} />
        <p>이미 진행중인 도전과제 입니다</p>
      </div>,
    );

  const {
    snackbar: errorAddingTodoSnackbar,
    open: showErrorAddingTodoSnackbar,
  } = useSnackBar(
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src={icon} width={50} height={50} />
      <p>도전과제 추가 중 문제가 발생했습니다.</p>
    </div>,
  );

  const { snackbar: todoAddedSnackbar, open: showTodoAddedSnackbar } =
    useSnackBar(
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={icon} width={50} height={50} />
        <p>도전과제가 추가되었습니다.</p>
      </div>,
    );

  const { snackbar: todoLimitSnackbar, open: showTodoLimitSnackbar } =
    useSnackBar(
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <img src={icon} width={50} height={50} />
        <p>3개 이상의 도전과제를 추가할 수 없습니다.</p>
      </div>,
    );

  const buttonRef = useRef<HTMLDivElement>(null);

  // 도전과제 추가하기
  const handleCreateTodo = async () => {
    //  todo가 3개 이상인 경우
    if (todos.length >= 3) {
      showTodoLimitSnackbar();
      return;
    }

    if (selectedAchievement) {
      try {
        await axiosInstance.post('/todo', {
          id: selectedAchievement.id,
        });
        showTodoAddedSnackbar();
        setTimeout(() => {
          navigate('/');
          showTodoAddedSnackbar();
        }, 1000);
      } catch (error) {
        if (
          axios.isAxiosError<{ message: string; statusCode: number }>(error) &&
          error.response
        ) {
          const { statusCode } = error.response.data;

          if (statusCode === 400) {
            showExistingTodoSnackbar();
          }
        } else {
          showErrorAddingTodoSnackbar();
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

  const totalAchievements = achievements.length;
  const completedAchievements = achievements.filter(
    (achievement) => achievement.achieved === 1,
  ).length;
  const completionRate =
    totalAchievements > 0
      ? (completedAchievements / totalAchievements) * 100
      : 0;

  if (achievements.length === 0 && !isLoading) {
    return (
      <AchievementsStyle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className='title'>
          <h2>도전과제를 선택해 주세요.</h2>
          <div className='game-img'>
            <img
              src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
              alt={game.name}
            />
          </div>
          <h3>{game.name}</h3>
          <span className='empty'>해당 게임은 도전과제가 없습니다.</span>
        </div>
      </AchievementsStyle>
    );
  }

  return (
    <AchievementsStyle
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className='title'>
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
          <div className='bar'>
            <div
              className='progress'
              style={{ width: `${completionRate}%` }}></div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className='loading'>
          <Loading />
        </div>
      ) : (
        <AchievementsList
          achievements={achievements}
          onSelect={setSelectedAchievement}
          isSelected={selectedAchievement}
        />
      )}
      {selectedAchievement && (
        <div ref={buttonRef} onClick={handleCreateTodo} className='button'>
          <button>선택한 도전과제 추가하기</button>
        </div>
      )}
      {existingTodoSnackbar}
      {errorAddingTodoSnackbar}
      {todoAddedSnackbar}
      {todoLimitSnackbar}
    </AchievementsStyle>
  );
}

const AchievementsStyle = styled(motion.div)`
  width: 100%;
  padding-bottom: 20px;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: #fff;

    h2,
    h3 {
      margin: 0;
    }
  }

  .game-img {
    height: 130px;
    img {
      height: 100%;
      border: 0;
      padding: 4px;
      margin: 0;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .bar {
    background: #3a3a3a;
    padding: 1px;
    border: 1px solid #aeaeae;
    max-width: 300px;
    .progress {
      background: #5f98d3;
      height: 8px;
      width: 0%; /* 초기 width 값 */
      transition: width 0.5s ease-in-out;
    }
  }
  .button {
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
  }

  .empty {
    margin-top: 10px;
    color: #ff0000; /* 메시지 색상 추가 */
  }

  .loading {
    margin-top: 40px;
  }
`;

export default Achievements;
