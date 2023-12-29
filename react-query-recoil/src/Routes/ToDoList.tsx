import { useState } from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

interface IForm {
  toDo: string;
}

interface IToDo {
  id: number;
  text: string;
  category: "Done" | "Doing" | "ToDo";
  // 그냥 string이 아니라 딱 저 3가지 카테고리중 하나만 가능하다고 명시
}
const toDoState = atom<IToDo[]>({
  // 타입 적어주는 곳 잘 보자
  key: "toDo",
  default: [],
});

function TodoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    // 데이터가 모두 유효하다면
    console.log(data, "data");
    setToDos((prev) => [
      { id: Date.now(), text: data.toDo, category: "ToDo" },
      ...prev,
    ]);
    setValue("toDo", "");
    // 입력후 빈 칸으로 만들어주기
  };
  console.log(toDos);

  return (
    <>
      <div className="text-4xl">TodoList</div>;
      <form className="flex w-96 m-8" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("toDo", { required: "할 일을 추가해주세요" })}
          className="form-input"
          placeholder="할 일 적기"
        />
        <button className="w-20 bg-pink-300 rounded-lg">add</button>
      </form>
      <ul>
        {toDos.map((toDo) => {
          return <li key={toDo.id}>{toDo.text}</li>;
        })}
      </ul>
    </>
  );
}

export default TodoList;
