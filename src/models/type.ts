export interface Todo {
  id: number;
  start: Date;
  end: Date | null;
  isFinished: boolean;
  userId: number;
  achievementId: number;
  achievementTitle: string;
  gameId: number;
  gameName: string;
} //내가 만든 투투 데이터

export interface ModalData {
  id: number;
  gameName: string;
  gameId: number;
  achieveName: string;
  achieveDescription: string;
  achieveIcon: string;
  start: Date;
  end: Date | null;
  completedRate: number;
  achieveId: number;
} //모달에 사용되는 데이터
