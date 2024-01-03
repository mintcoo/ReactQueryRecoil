import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoStateTwo } from "../Components/atoms";
import Board from "../Components/Board";

function DragDrop() {
  const [toDos, setToDos] = useRecoilState(toDoStateTwo);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    // 드래그가 끝난 시점에 실행될 함수
    // 인자로 args에 목적지, 소스 같은 정보들이 담겨있다
    // 타입은 onDragEnd함수를 타고 타고 가서 찾았다
    // console.log(args);
    if (destination?.index === undefined) return;
    // 목적지가 없이 제자리에 두면 그냥 return 안그러면 밖에 끌어다놔도 위치가 바뀜
    // setToDos((prev) => {
    //   const copyNewToDos = [...prev];
    //   // 이렇게 하는 이유는 state를 수정하지않아야 하기 때문
    //   copyNewToDos.splice(source.index, 1);
    //   // 내가 드래그시작한 놈의 인덱스로 한개 지움
    //   copyNewToDos.splice(destination?.index as number, 0, draggableId);
    //   // 그리고 목적지 인덱스로 내가 빼내온놈을 넣어줌, draggableId는 Todo로 해놧음 내가
    //   return copyNewToDos;
    // });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center w-full h-full">
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}

export default DragDrop;
