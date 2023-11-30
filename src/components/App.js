import React from "react";
import Footer from "./Footer";
import AddTodo from "../containers/AddTodo";
import VisibleTodoList from "../containers/VisibleTodoList";
import { useParams } from "react-router-dom";
const App = () => {
  const params = useParams();
  return (
    <div>
      <AddTodo />
      <VisibleTodoList filter={params.filter || "SHOW_ALL"} />
      <Footer />
    </div>
  );
};

export default App;
