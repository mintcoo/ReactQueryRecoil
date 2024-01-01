import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "./atoms";

function ToDo({ text, category, id }: IToDo) {
  // text만 골라받아도 기존의 IToDo 타입을 쓸수있네
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    // @@ 여기 타입 중요 IToDo에서도 category 타입이란걸 명시해주면 깔끔히 해결
    setToDos((prev) => {
      const index = prev.findIndex((element) => element.id === id);
      // 인덱스를 찾고
      const frontPrev = prev.slice(0, index);
      // 기존 배열의 앞부분 전부
      const backPrev = prev.slice(index + 1);
      // 기존 배열의 뒷부분 전부
      const modiToDo = { text, id, category: newCategory };
      return [...frontPrev, modiToDo, ...backPrev];
      // 이렇게 하는 이유는 순서를 바꾸지 않기 위함
    });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== Categories.ToDo && (
        <button
          onClick={() => onClick(Categories.ToDo)}
          className="btn-primary"
        >
          To Do
        </button>
      )}
      {category !== Categories.Doing && (
        <button
          onClick={() => onClick(Categories.Doing)}
          className="btn-primary"
        >
          Doing
        </button>
      )}
      {category !== Categories.Done && (
        <button
          onClick={() => onClick(Categories.Done)}
          className="btn-primary"
        >
          Done
        </button>
      )}
    </li>
  );
  // 리팩토링 하면서 key는 필요없어져서 지움 ToDoList에서 key 넣어줌
}

export default ToDo;
