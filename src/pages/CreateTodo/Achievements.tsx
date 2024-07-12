import styled from 'styled-components';
import useAchievements from '../../hooks/useAchievements';
import { useLocation, useNavigate } from 'react-router-dom';
import AchievementsList from '../../components/Achievements/AchievementsList';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axios';
import axios from 'axios';
import Loading from '../../components/common/Loading';
import useSnackBar from '../../hooks/useSnackBar';
import icon from '../../assets/SnackBarIcon.png';

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

  const { snackbar: snackbar1, open: open1 } = useSnackBar(
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src={icon} width={50} height={50} />
      <p>이미 진행중인 도전과제 입니다</p>
    </div>,
  );
  const { snackbar: snackbar2, open: open2 } = useSnackBar(
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src={icon} width={50} height={50} />
      <p>도전과제 추가 중 문제가 발생했습니다.</p>
    </div>,
  );
  const { snackbar: snackbar3, open: open3 } = useSnackBar(
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <img src={icon} width={50} height={50} />
      <p>도전과제가 추가되었습니다.</p>
    </div>,
  );

  // TODO : 현재 도전과제가 3개가 넘으면 예외처리 추가해 (API연결 후 작업)
  const handleCreateTodo = async () => {
    if (selectedAchievement) {
      try {
        await axiosInstance.post('/todo', {
          id: selectedAchievement.id,
        });
        open3();
        // alert('도전과제가 추가되었습니다.');
        navigate('/');
      } catch (error) {
        if (
          axios.isAxiosError<{ message: string; statusCode: number }>(error) &&
          error.response
        ) {
          // const { message, statusCode } = error.response.data;
          const { statusCode } = error.response.data;

          if (statusCode === 400) {
            open1();
            // alert(message);
          }
        } else {
          // alert('도전과제 추가 중 문제가 발생했습니다.');
          open2();
        }
      }
    }
  };

  // 도전과제 완료율 계산
  const totalAchievements = achievements.length;
  // 도전과제 중 achieved가 1인 것만 필터링
  const completedAchievements = achievements.filter(
    (achievement) => achievement.achieved === 1,
  ).length;
  // 완료율 계산
  const completionRate =
    totalAchievements > 0
      ? (completedAchievements / totalAchievements) * 100
      : 0;

  // 선택한 게임의 도전과제가 없을 때
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
        <div onClick={handleCreateTodo} className='button'>
          <button>선택한 도전과제 추가하기</button>
        </div>
      )}
      {snackbar1}
      {snackbar2}
      {snackbar3}
    </AchievementsStyle>
  );
}

const AchievementsStyle = styled(motion.div)`
  width: 100%;
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
    margin-top: 10px;

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
