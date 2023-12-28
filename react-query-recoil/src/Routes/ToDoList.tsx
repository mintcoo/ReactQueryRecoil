import { useState } from "react";

function ToDoList() {
  const [todo, setTodo] = useState<string>("");

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <>
      <div className="text-4xl">ToDoList</div>;
      <form onSubmit={onSubmitForm}>
        <input
          onChange={onChangeInput}
          value={todo}
          className="dark:text-black"
          placeholder="할 일 적기"
        />
        <button className="w-20 bg-pink-300 rounded-lg">add</button>
      </form>
    </>
  );
}

export default ToDoList;
