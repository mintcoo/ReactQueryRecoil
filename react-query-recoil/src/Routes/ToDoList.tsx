import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "../Components/CreateToDo";
import {
  Categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "../Components/atoms";
import ToDo from "../Components/ToDo";

function TodoList() {
  // const toDos = useRecoilValue(toDoState);
  // 값만 주시하므로 useRecoilValue 사용
  const toDos = useRecoilValue(toDoSelector);
  // 3개의 배열을 리턴중인데 배열을 열고 배열별로 이름을 지정하면 각각 꺼낼수있음
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };
  console.log(toDos);
  return (
    <>
      <div className="text-4xl">TodoList</div>;
      <select
        value={category}
        className="text-2xl bg-sky-200"
        onInput={onInput}
      >
        <option value={Categories.ToDo}>To Do</option>
        <option value={Categories.Doing}>Doing</option>
        <option value={Categories.Done}>Done</option>
      </select>
      <CreateToDo />
      <div className="text-4xl font-bold text-purple-900">할 일</div>
      {toDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </>
  );

  // =========== 아래는 처음의 recoil selector 기본방법 =========
  // return (
  //   <>
  //     <div className="text-4xl">TodoList</div>;
  //     <CreateToDo />
  //     <div className="text-4xl font-bold text-purple-900">할 일</div>
  //     <ul>
  //       {toDo.map((toDo) => (
  //         <ToDo key={toDo.id} {...toDo} />
  //       ))}
  //       {/* {toDos.map((toDo) => <ToDo text={toDo.text} category={toDo.category} id={toDo.id} />)} */}
  //       {/* 이렇게 길게 안쓰고 위에처럼 한번에 가능 왜냐면 toDo자체가 전달하는 props와 같은 모양이기때문 */}
  //     </ul>
  //     <div className="text-4xl font-bold text-purple-900">하는 중</div>
  //     <ul>
  //       {doing.map((toDo) => (
  //         <ToDo key={toDo.id} {...toDo} />
  //       ))}
  //     </ul>
  //     <div className="text-4xl font-bold text-purple-900">끝</div>
  //     <ul>
  //       {done.map((toDo) => (
  //         <ToDo key={toDo.id} {...toDo} />
  //       ))}
  //     </ul>
  //   </>
  // );
}

export default TodoList;
