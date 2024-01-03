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
      {(provided) => {
        return (
          <div
            className="board-style"
            ref={provided.innerRef}
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
