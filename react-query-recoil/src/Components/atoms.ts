import { atom, selector } from "recoil";
// selector는 atom의 output을 변형시키는 것
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

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    // atom의 값을 가져옴 atom을 항상 보고있음
    const toDoList = toDos.filter((toDo) => toDo.category == "ToDo");
    // 조건에 맞는것만 배열로 반환하는 함수 filter
    const doingList = toDos.filter((toDo) => toDo.category == "Doing");
    const doneList = toDos.filter((toDo) => toDo.category == "Done");
    return [toDoList, doingList, doneList];
    // 각각을 배열로 만들어서 하나의 배열안에 [[1], [2], [3]] 이런식으로 리턴
  },
});
