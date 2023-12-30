import { atom } from "recoil";
// 타입이랑 atom이랑 같이 export 해주자

export interface IToDo {
  id: number;
  text: string;
  category: "Done" | "Doing" | "ToDo";
  // 그냥 string이 아니라 딱 저 3가지 카테고리중 하나만 가능하다고 명시
}

export const toDoState = atom<IToDo[]>({
  // 타입 적어주는 곳 잘 보자
  key: "toDo",
  default: [],
});
