import { Route, Routes } from "react-router-dom";
import ReactHookForm from "./Routes/ReactHookForm";
import TodoList from "./Routes/TodoList";

function Router() {
  return (
    <Routes>
      <Route path="/ReactHookForm" element={<ReactHookForm />} />
      <Route path="/TodoList" element={<TodoList />} />
    </Routes>
  );
}

export default Router;
