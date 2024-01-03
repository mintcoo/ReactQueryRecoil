import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface IDraggableCard {
  todo: string;
  index: number;
}

function DraggableCard({ todo, index }: IDraggableCard) {
  console.log(todo, "얼마나 렌더링되나");
  // 최적화를 위해 렌더링 되지 말아야할것들이 존재한다
  // react는 부모의 state를 바꾸면 그 자식들도 전부 재렌더링된다
  // react memo를 통해 props가 변하지 않는다면 컴포넌트 재렌더링을 막을수있다
  // React.memo는 props 변화에만 영향을 줍니다. React.memo로 감싸진 함수 컴포넌트 구현에 useState, useReducer 또는 useContext 훅을 사용한다면, 여전히 state나 context가 변할 때 다시 렌더링됩니다.
  // 이 메서드는 오직 성능 최적화를 위하여 사용됩니다. 렌더링을 “방지”하기 위하여 사용하지 마세요. 버그를 만들 수 있습니다.

  return (
    <Draggable key={todo} draggableId={todo} index={index}>
      {/* 마찬가지로 children이 필수인데 그냥 react 요소면 안되고 반드시 함수로 반환, key와 draggableId는 통일 */}
      {(provided) => {
        return (
          <div
            className="card-style"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {/* draggaleProps << 내가 움직일때 어떤요소가 움직이게되는지 */}
            {todo}
            {/* <span {...provided.dragHandleProps}>🍗</span> */}
            {/* // dragHandleProps << 이게 달려있는 특정요소에서만 드래그 가능 */}
          </div>
        );
      }}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
