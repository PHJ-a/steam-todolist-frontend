export interface Todo {
  todoId: number;
  start: Date;
  end: Date | null;
  isFinished: boolean;
  achieveId: number;
  achieveName: string;
  gameId: number;
  gameName: string;
} //내가 만든 투투 데이터

export interface ModalData {
  todoId: number;
  start: Date;
  end: Date | null;
  isFinished: boolean;
  achieveId: number;
  achieveName: string;
  gameId: number;
  gameName: string;
  achieveTag: string;
  achieveDescription: string;
  achieveIcon: string;
  completedRate: string;
} //모달에 사용되는 데이터
