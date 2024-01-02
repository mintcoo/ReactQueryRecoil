import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function DragDrop() {
  const toDos = ["a", "b", "c", "d", "e", "f"];
  const onDragEnd = () => {
    // 드래그가 끝난 시점에 실행될 함수
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center w-full h-full">
          <Droppable droppableId="one">
            {/* children이 필수인데 그냥 react 요소면 안되고 반드시 함수로 반환 */}
            {(provided) => {
              return (
                <div
                  className="board-style"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {toDos.map((todo, index) => (
                    <Draggable draggableId={todo} index={index}>
                      {/* 마찬가지로 children이 필수인데 그냥 react 요소면 안되고 반드시 함수로 반환 */}
                      {(provided) => {
                        return (
                          <div
                            className="card-style"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            {/* draggaleProps << 내가 움직일때 어떤요소가 움직이게되는지 */}
                            {todo}
                            <span {...provided.dragHandleProps}>🍗</span>
                            {/* // dragHandleProps << 이게 달려있는 특정요소에서만 드래그 가능 */}
                          </div>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {/* Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용 */}
                  {/* Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지 */}
                </div>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default DragDrop;
