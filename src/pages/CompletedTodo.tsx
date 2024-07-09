import { useState } from 'react';
import styled from 'styled-components';
import useCompletedTodos from '../hooks/useCompletedTodo';
import useModal from '../hooks/useModal';
import { ModalData } from '../models/type';
import TodoModal from '../components/modal/TodoModal';
import { FaSearch } from 'react-icons/fa';

const itemsPerPage = 8; // 페이지 당 항목 수

const AchievementTable = () => {
  const { todos } = useCompletedTodos();
  const { open, openModal, closeModal, getModalData } = useModal();
  const [modalData, setmodalData] = useState<ModalData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  // 현재 페이지의 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleSearch = () => {
    const filtered = todos.filter((todo) =>
      todo.achievementTitle.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredTodos(filtered);
    setCurrentPage(1);
  };
  return (
    <Wrapper>
      <h2>도전과제 목록</h2>
      <div className='searchContainer'>
        <input
          type='text'
          placeholder='도전과제명을 입력하세요'
          className='tableSearch'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='searchButton' onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

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
  h2 {
    color: white;
    text-align: center;
    margin-bottom: 20px;
  }
  .searchContainer {
    margin: 0 auto;
    width: 50%;
    display: flex;
    align-items: center;
    background-color: #34495e;
    border-radius: 25px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    .tableSearch {
      flex-grow: 1;
      border: none;
      outline: none;
      height: 100%;
      background-color: transparent;
      color: #ecf0f1;
      font-size: 16px;
      padding: 10px 15px 10px 30px;

      &::placeholder {
        color: #bdc3c7;
      }
    }
    .searchButton {
      background: none;
      border: none;
      color: #ecf0f1;
      font-size: 20px;
      cursor: pointer;
      padding: 10px;
      transition: color 0.3s ease;

      &:hover {
        color: #3498db;
      }
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  background-color: #2c3e50;
  color: #ecf0f1;
`;

const TableHeader = styled.thead`
  background-color: #34495e;
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TableRow = styled.tr`
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:nth-child(even) {
    background-color: #34495e;
  }

  &:hover {
    background-color: #3498db;
  }
`;

const TableCell = styled.td`
  padding: 14px;
  border-bottom: 1px solid #445566;
`;

const Pagination = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationButton = styled.button`
  margin: 0 8px;
  padding: 10px 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s, transform 0.2s;
  font-weight: bold;

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PaginationInfo = styled.span`
  margin: 0 12px;
  font-weight: bold;
  color: #ecf0f1;
`;

export default AchievementTable;
