import { useState } from "react";
import { useForm } from "react-hook-form";

// React Hook Form
// 사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 form입니다.
// npm install react-hook-form
//
// const {
// register,
// handleSubmit,
// formState: { errors },
// } = useForm();

// input {...register('lastName', { required: true })}
//
// https://react-hook-form.com

// register: (name: string, RegisterOptions?) => ({ onChange, onBlur, name, ref })
// 이 메서드를 사용하면 input을 등록하거나 element를 선택하고 유효성 검사 규칙을 React Hook Form에 적용할 수 있습니다.
// 유효성 검사 규칙은 모두 HTML 표준을 기반으로 하며 사용자 지정 유효성 검사 방법도 허용합니다.

// watch: (names?: string | string[] | (data, options) => void) => unknown
// input의 변화를 구독합니다. 이 메서드는 지정된 input을 감시하고 해당 값을 반환합니다. input 값을 렌더링하고 조건에 따라 무엇을 렌더링할지 결정하는 데 유용합니다.

// handleSubmit: ((data: Object, e?: Event) => void, (errors: Object, e?: Event) => void) => Function
// 이 함수는 form 유효성 검사가 성공하면 form 데이터를 받습니다.
interface IForm {
  toDo: string;
  email: string;
  password: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  // console.log(register("toDo"), "레지");
  // console.log(watch(), "워치");
  // console.log(errors, "에러");
  // formState.errors 모든에러를 볼수있고 메시지도 보낼수있다
  const onValid = (data: IForm) => {
    console.log(data, "데이터");
  };

  return (
    <>
      <div className="text-4xl">ToDoList</div>;
      <form
        className="flex flex-col justify-between h-96 w-48 m-8"
        onSubmit={handleSubmit(onValid)}
      >
        {/* handleSubmit은 필수첫번째로 유효성검사가 완료되었을때 실행될 함수와, 필수는아닌데 두번째로 유효성검사 에러일때 실행될함수 2개의인자를 받음 */}
        <input
          className="form-input"
          {...register("toDo", { required: "할 일을 적어주세염" })}
          // 이렇게 유효성조건들을 자바스크립트로 적어주는 이유는
          // html에 적는것보다 더 안전하게 보호해주기때문(개발자모드로 지우거나, 지원안되는 브라우저거나)
          // 유효성 검사가 안된곳으로 자동 오토포커스해줌 << 굿기능
          // required뒤에 true가 아닌 저렇게 메시지적으면 에러일때 메시지가 나온다
          placeholder="할 일 적기"
        />

        <input
          className="form-input"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "올바른 이메일 양식을 입력해주세염",
            },
            minLength: { value: 10, message: "10자리 이상 입력해주세요" },
          })}
          placeholder="email"
        />
        <span className="text-red-600 font-bold">
          {errors?.email?.message as string}
        </span>
        <input
          className="form-input"
          {...register("password", { required: true })}
          placeholder="password"
        />
        <button className="w-20 bg-pink-300 rounded-lg">add</button>
      </form>
    </>
  );
}

// function ToDoList() {
//   const [todo, setTodo] = useState<string>("");

//   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };

//   const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//   };

//   return (
//     <>
//       <div className="text-4xl">ToDoList</div>;
//       <form onSubmit={onSubmitForm}>
//         <input
//           onChange={onChangeInput}
//           value={todo}
//           className="dark:text-black"
//           placeholder="할 일 적기"
//         />
//         <button className="w-20 bg-pink-300 rounded-lg">add</button>
//       </form>
//     </>
//   );
// }

export default ToDoList;
