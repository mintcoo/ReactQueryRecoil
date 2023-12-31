import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoStateTwo } from "../Components/atoms";
import Board from "../Components/Board";
import { useState } from "react";

function DragDrop() {
  const [text, setText] = useState<string>("");
  const [toDos, setToDos] = useRecoilState(toDoStateTwo);
  // const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
  //   // 드래그가 끝난 시점에 실행될 함수
  //   // 인자로 args에 목적지, 소스 같은 정보들이 담겨있다
  //   // 타입은 onDragEnd함수를 타고 타고 가서 찾았다
  //   // console.log(args);
  //   if (destination?.index === undefined) return;
  //   // 목적지가 없이 제자리에 두면 그냥 return 안그러면 밖에 끌어다놔도 위치가 바뀜
  //   // setToDos((prev) => {
  //   //   const copyNewToDos = [...prev];
  //   //   // 이렇게 하는 이유는 state를 수정하지않아야 하기 때문
  //   //   copyNewToDos.splice(source.index, 1);
  //   //   // 내가 드래그시작한 놈의 인덱스로 한개 지움
  //   //   copyNewToDos.splice(destination?.index as number, 0, draggableId);
  //   //   // 그리고 목적지 인덱스로 내가 빼내온놈을 넣어줌, draggableId는 Todo로 해놧음 내가
  //   //   return copyNewToDos;
  //   // });
  // };
  // 위에는 한개짜리 아래는 여러개
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, draggableId, source } = info;
    if (source.droppableId === destination?.droppableId) {
      // 현재 같은 보드안에서 움직이고 있다면
      if (!destination) return;
      setToDos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        // 이렇게 하는 이유는 state를 수정하지않아야 하기 때문, 그리고 object라서 이렇게 접근
        copyBoard.splice(source.index, 1);
        // 내가 드래그시작한 놈의 인덱스로 한개 지움
        copyBoard.splice(destination?.index as number, 0, draggableId);
        // 그리고 목적지 인덱스로 내가 빼내온놈을 넣어줌, draggableId는 Todo로 해놧음 내가

        return {
          ...allBoards,
          [source.droppableId]: copyBoard,
          // 오브젝트는 이런식으로 왜냐면 중복된 키값은 나중에 선언한걸로 덧씌워지기떄문
        };
      });
    }
    if (source.droppableId !== destination?.droppableId) {
      // 다른 보드로 움직이는 경우
      if (!destination) return;
      setToDos((allBoards) => {
        const copySourceBoard = [...allBoards[source.droppableId]];
        const copyDestiBoard = [...allBoards[destination.droppableId]];
        copySourceBoard.splice(source.index, 1);
        copyDestiBoard.splice(destination?.index as number, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: copySourceBoard,
          [destination.droppableId]: copyDestiBoard,
        };
      });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setToDos((allBoards) => {
      const copyNewToDoList = [...allBoards["ToDo"], text];
      return {
        ...allBoards,
        ToDo: copyNewToDoList,
      };
    });
  };
  // 우선 ToDo로만 해서 바로 입력하면 들어가게 해봤음
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          onChange={onChange}
          type="text"
          placeholder="toDo?"
          className="border-2"
        />
      </form>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex items-center justify-center w-full h-screen">
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}

export default DragDrop;
