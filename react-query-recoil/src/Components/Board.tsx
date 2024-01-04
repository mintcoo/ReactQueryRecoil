import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

interface IBoard {
  toDos: string[];
  boardId: string;
}

function Board({ toDos, boardId }: IBoard) {
  return (
    <Droppable droppableId={boardId}>
      {/* children이 필수인데 그냥 react 요소면 안되고 반드시 함수로 반환 */}
      {(provided, snapshot) => {
        // console.log(snapshot.isDraggingOver, "드래그 위로?");
        // 드래그 위로 올라왔나 여부체크
        return (
          <div
            className={`board-style ${
              snapshot.isDraggingOver ? "bg-slate-300" : ""
            }`}
            ref={provided.innerRef}
            // useRef()
            // useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다.
            // 반환된 객체는 컴포넌트의 전 life cycle을 통해 유지될 것입니다.
            // 일반적인 사용 사례는 자식에게 접근하는 경우입니다.
            {...provided.droppableProps}
          >
            <div className="text-3xl font-bold text-center">{boardId}</div>
            {toDos.map((todo, index) => (
              <DraggableCard key={todo} todo={todo} index={index} />
            ))}
            {provided.placeholder}
            {/* Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용 */}
            {/* Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지 */}
          </div>
        );
      }}
    </Droppable>
  );
}

export default Board;
