import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function TodoList() {
  const [todo, setTodo] = useState<string>("");

  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = (data: IForm) => {
    console.log(data, "data");
    setValue("toDo", "");
  };

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
    </>
  );
}

export default TodoList;
