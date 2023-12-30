import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
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

  return (
    <form className="flex w-96 m-8" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "할 일을 추가해주세요" })}
        className="form-input"
        placeholder="할 일 적기"
      />
      <button className="w-20 bg-pink-300 rounded-lg">add</button>
    </form>
  );
}

export default CreateToDo;
