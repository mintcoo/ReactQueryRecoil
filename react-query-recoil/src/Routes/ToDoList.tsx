import { useRecoilValue } from "recoil";
import CreateToDo from "../Components/CreateToDo";
import { toDoSelector, toDoState } from "../Components/atoms";
import ToDo from "../Components/ToDo";

function TodoList() {
  // const toDos = useRecoilValue(toDoState);
  // 값만 주시하므로 useRecoilValue 사용
  const [toDo, doing, done] = useRecoilValue(toDoSelector);
  // 3개의 배열을 리턴중인데 배열을 열고 배열별로 이름을 지정하면 각각 꺼낼수있음

  return (
    <>
      <div className="text-4xl">TodoList</div>;
      <CreateToDo />
      <div className="font-bold text-purple-900 text-4xl">할 일</div>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
        {/* {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />)} */}
        {/* 이렇게 길게 안쓰고 위에처럼 한번에 가능 왜냐면 toDo자체가 전달하는 props와 같은 모양이기때문 */}
      </ul>
      <div className="font-bold text-purple-900 text-4xl">하는 중</div>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <div className="font-bold text-purple-900 text-4xl">끝</div>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
