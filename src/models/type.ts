export type Todo = {
  id: number;
  achievementId: number;
  achievementTitle: string;
  gameId: number;
  gameName: string;
  startDate: Date;
  endDate: Date | null;
}; //내가 만든 투투 데이터

export type ModalData = {
  gameName: string;
  gameImage: string;
  achievementTitle: string;
  achievementDesc: string;
  startDate: Date;
  endDate: Date | null;
  iscompleted: boolean;
  progress: number;
  icon: string;
}; //모달에 사용되는 데이터
