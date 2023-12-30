import { atom, selector } from "recoil";
// selector는 atom의 output을 변형시키는 것
// 타입이랑 atom이랑 같이 export 해주자

export interface IToDo {
  id: number;
  text: string;
  category: "Done" | "Doing" | "ToDo";
  // 그냥 string이 아니라 딱 저 3가지 카테고리중 하나만 가능하다고 명시
}

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "ToDo",
});

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
    const category = get(categoryState);
    // 현재의 선택된 category 정보가져옴

    const toDoList = toDos.filter((toDo) => toDo.category === category);
    // 조건에 맞는것만 배열로 반환하는 함수 filter
    // 현재 카테고리와 같은 toDo들만 걸러서 배열로 만들어줌

    return toDoList;
  },
});
