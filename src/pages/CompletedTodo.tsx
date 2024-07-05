import { useState } from 'react';
import styled from 'styled-components';

const achievementsData = [
  {
    id: 1,
    achievementTitle: '엘든링 도전과제 1',
    achievementId: 101,
    gameId: 201,
    gameName: '엘든링',
    startDate: new Date('2024-06-22T00:00:00'),
    endDate: new Date('2024-07-01T00:00:00'),
  },
  {
    id: 2,
    achievementTitle: '엘든링 도전과제 2',
    achievementId: 102,
    gameId: 201,
    gameName: '엘든링',
    startDate: new Date('2024-06-25T00:00:00'),
    endDate: new Date('2024-07-05T00:00:00'),
  },
  {
    id: 3,
    achievementTitle: '다른 게임 도전과제 1',
    achievementId: 103,
    gameId: 202,
    gameName: '다른 게임',
    startDate: new Date('2024-07-01T00:00:00'),
    endDate: new Date('2024-07-10T00:00:00'),
  },
  {
    id: 4,
    achievementTitle: '다른 게임 도전과제 2',
    achievementId: 104,
    gameId: 202,
    gameName: '다른 게임',
    startDate: new Date('2024-07-01T00:00:00'),
    endDate: new Date('2024-07-10T00:00:00'),
  },
  {
    id: 5,
    achievementTitle: '게임 도전과제 1',
    achievementId: 105,
    gameId: 203,
    gameName: '게임',
    startDate: new Date('2024-07-05T00:00:00'),
    endDate: new Date('2024-07-15T00:00:00'),
  },
  {
    id: 6,
    achievementTitle: '게임 도전과제 2',
    achievementId: 106,
    gameId: 203,
    gameName: '게임',
    startDate: new Date('2024-07-10T00:00:00'),
    endDate: new Date('2024-07-20T00:00:00'),
  },
  {
    id: 7,
    achievementTitle: '퀘스트 도전과제 1',
    achievementId: 107,
    gameId: 204,
    gameName: '퀘스트',
    startDate: new Date('2024-07-12T00:00:00'),
    endDate: new Date('2024-07-22T00:00:00'),
  },
  {
    id: 8,
    achievementTitle: '퀘스트 도전과제 2',
    achievementId: 108,
    gameId: 204,
    gameName: '퀘스트',
    startDate: new Date('2024-07-15T00:00:00'),
    endDate: new Date('2024-07-25T00:00:00'),
  },
  {
    id: 9,
    achievementTitle: '챌린지 도전과제 1',
    achievementId: 109,
    gameId: 205,
    gameName: '챌린지',
    startDate: new Date('2024-07-18T00:00:00'),
    endDate: new Date('2024-07-28T00:00:00'),
  },
  {
    id: 10,
    achievementTitle: '챌린지 도전과제 2',
    achievementId: 110,
    gameId: 205,
    gameName: '챌린지',
    startDate: new Date('2024-07-20T00:00:00'),
    endDate: new Date('2024-07-30T00:00:00'),
  },
];

const itemsPerPage = 10; // 페이지 당 항목 수

const AchievementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = achievementsData.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Wrapper>
      <h2>도전과제 목록</h2>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>도전과제 이름</TableHeaderCell>
            <TableHeaderCell>게임명</TableHeaderCell>
            <TableHeaderCell>시작 시간</TableHeaderCell>
            <TableHeaderCell>걸린 시간</TableHeaderCell>
          </tr>
        </TableHeader>
        <tbody>
          {currentItems.map((achievement) => (
            <TableRow key={achievement.id}>
              <TableCell>{achievement.achievementTitle}</TableCell>
              <TableCell>{achievement.gameName}</TableCell>
              <TableCell>{achievement.startDate.toLocaleString()}</TableCell>
              <TableCell>
                {(achievement.endDate.getTime() -
                  achievement.startDate.getTime()) /
                  (1000 * 60 * 60) +
                  '시간'}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          이전
        </PaginationButton>
        <PaginationInfo>페이지 {currentPage}</PaginationInfo>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentItems.length < itemsPerPage}>
          다음
        </PaginationButton>
      </Pagination>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 20px;
  font-family: 'Arial', sans-serif;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

const TableHeader = styled.thead`
  background-color: #4a90e2;
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:hover {
    background-color: #e9ecef;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #357abd;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.span`
  margin: 0 10px;
  font-weight: bold;
`;

export default AchievementTable;
