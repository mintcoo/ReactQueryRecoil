import { atom, selector } from "recoil";
// selector는 atom의 output을 변형시키는 것
// 타입이랑 atom이랑 같이 export 해주자

export enum Categories {
  // 잘 살펴보면 각각 값이 0, 1, 2로 표현된다 << 간단하게 쓰기 좋음, 데이터베이스 정리도 쉽고
  // "ToDo",
  // "Doing",
  // "Done",
  // 타입을 바꿔줄수도있음 "ToDo" = "ToDo" << 이런식으로 원하는 이름으로
  "ToDo" = "ToDo",
  "Doing" = "Doing",
  "Done" = "Done",
}

// Enums

// 열거형은 TypeScript가 제공하는 기능 중 하나입니다.
// enum은 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있습니다.
// 열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있습니다. TypeScript는 숫자와 문자열-기반 열거형을 제공합니다.

// 숫자 열거형 (Numeric enums)
// enum Direction {
// Up = 1,
// Down,
// Left,
// Right,
// }

// 문자열 열거형 (String enums)
// enum Direction {
// Up = "UP",
// Down = "DOWN",
// Left = "LEFT",
// Right = "RIGHT",
// }
// 등등..

export interface IToDo {
  id: number;
  text: string;
  category: Categories;
  // 그냥 string이 아니라 딱 저 3가지 카테고리중 하나만 가능하다고 명시
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.ToDo,
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
