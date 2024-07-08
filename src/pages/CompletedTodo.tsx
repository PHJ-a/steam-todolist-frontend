import { useState } from 'react';
import styled from 'styled-components';
import useCompletedTodos from '../hooks/useCompletedTodo';
import useModal from '../hooks/useModal';
import { ModalData } from '../models/type';
import TodoModal from '../components/modal/TodoModal';

const itemsPerPage = 8; // 페이지 당 항목 수

const AchievementTable = () => {
  const { todos } = useCompletedTodos();
  const { open, openModal, closeModal, getModalData } = useModal();
  const [modalData, setmodalData] = useState<ModalData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todos.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const hanldeModal = async (id: number) => {
    const data2: ModalData = {
      id: 1,
      gameName: `엘든링`,
      gameId: 123,
      achieveName: '엘든링 도전과제',
      achieveDescription: '엘든링 도전과제 설명',
      start: new Date('2024-06-22T00:00:00'),
      end: new Date('2024-06-22T12:00:00'),
      completedRate: 85,
      achieveId: 1,
      achieveIcon: '',
    };
    // const data = await getModalData(id);
    setmodalData(data2);
    openModal();
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
          {currentItems.map((todo) => (
            <TableRow key={todo.id} onClick={() => hanldeModal(todo.id)}>
              <TableCell>{todo.achievementTitle}</TableCell>
              <TableCell>{todo.gameName}</TableCell>
              <TableCell>{todo.start.toLocaleString()}</TableCell>
              <TableCell>
                {(todo.end!.getTime() - todo.start.getTime()) /
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
      <TodoModal open={open} close={closeModal} data={modalData} />
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
