import { useRecoilValue } from "recoil";
import CreateToDo from "../Components/CreateToDo";
import { toDoState } from "../Components/atoms";
import ToDo from "../Components/ToDo";

function TodoList() {
  const toDos = useRecoilValue(toDoState);
  // 값만 주시하므로 useRecoilValue 사용

  return (
    <>
      <div className="text-4xl">TodoList</div>;
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
        {/* {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />)} */}
        {/* 이렇게 길게 안쓰고 위에처럼 한번에 가능 왜냐면 toDo자체가 전달하는 props와 같은 모양이기때문 */}
      </ul>
    </>
  );
}

export default TodoList;
