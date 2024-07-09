import styled from 'styled-components';
import useAchievements from '../../hooks/useAchievements';
import { useLocation } from 'react-router-dom';
import AchievementsList from '../../components/Achievements/AchievementsList';
import { motion } from 'framer-motion';
import axiosInstance from '../../api/axios';

function Achievements() {
  const location = useLocation();
  const game = location.state;

  const { achievements, setSelectedAchievement, selectedAchievement } =
    useAchievements(game);

  const handleCreateTodo = async () => {
    if (selectedAchievement !== null) {
      try {
        const response = await axiosInstance.post('/todo', {
          id: selectedAchievement.id,
        });
      } catch (error: any) {
        // TODO: 이미 생성된 todo인 경우 에러 처리 추가 예정
        console.error('Error creating todo:', error);
      }
    }
  };

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
          <span>80 중 2 (3%) 개의 도전과제 완료</span>
          <div className='bar'>
            <div className='progress'></div>
          </div>
        </div>
      </div>
      <AchievementsList
        achievements={achievements}
        onSelect={setSelectedAchievement}
        isSelected={selectedAchievement}
      />
      {selectedAchievement && (
        <div onClick={handleCreateTodo} className='button'>
          <button>선택한 도전과제 추가하기</button>
        </div>
      )}
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
      width: 3%;
    }
  }
  .button {
    //가운데 정렬
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
`;

export default Achievements;
