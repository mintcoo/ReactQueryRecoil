import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
  converter: JSON,
});
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
  // 그냥 string이 아니라 딱 저 3가지 카테고리중 하나만 가능하다고 명시
}

// Enums
// 계속해서 써야하는 값을 저장하는 용도
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
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.ToDo,
});

export const toDoState = atom<IToDo[]>({
  // 타입 적어주는 곳 잘 보자
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
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

// ======= 아래로 recoil의 get과 set 연습용 "분 & 시간"==========
export const minuteState = atom<number>({
  key: "minute",
  default: 0,
});

export const hourSelector = selector<number>({
  key: "hourSelector",
  get: ({ get }) => {
    const minuteValue = get(minuteState);
    const hourConvertor = Math.floor(minuteValue / 60);
    return hourConvertor;
  },
  set: ({ set }, newValue) => {
    // state값을 수정할 수 있는 set
    // 시간값을 변경하면 minute 분값도 변하도록 세팅
    const newMinute = Number(newValue) * 60;
    // number값만 해주기위해서
    set(minuteState, newMinute);
  },
});
// 결국 selector는 atom의 여러값들을 가져와서 내 입맛에 맞게 변형해서 쓰는용도 매우유용하다

// ============ 아래로 드래그 & 드랍 ===============
interface IToDoStateTwo {
  [key: string]: string[];
  // 객체의 키가 string이란걸 알려줌
  // "x" : string[] 가능
  // 1 : string[] 불가능
}
//
export const toDoStateTwo = atom<IToDoStateTwo>({
  // 정확하게 타입설명 해주지않으면 타입스크립트는 아래 오로지 3가지의 default만 있는줄 안다. 후에 board를 추가할수도있는데
  key: "toDoStateTwo",
  default: {
    ToDo: ["a", "b"],
    Doing: ["c", "e", "f"],
    Done: ["d"],
  },
  effects_UNSTABLE: [persistAtom],
});
