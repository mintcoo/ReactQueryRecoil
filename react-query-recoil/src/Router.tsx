import { Route, Routes } from "react-router-dom";
import ReactHookForm from "./Routes/ReactHookForm";
import TodoList from "./Routes/TodoList";
import DragDrop from "./Routes/DragDrop";
import RecoilSelector from "./Routes/RecoilSelector";

function Router() {
  return (
    <Routes>
      <Route path="/ReactHookForm" element={<ReactHookForm />} />
      <Route path="/TodoList" element={<TodoList />} />
      <Route path="/RecoilSelector" element={<RecoilSelector />} />
      <Route path="/DragDrop" element={<DragDrop />} />
    </Routes>
  );
}

export default Router;
