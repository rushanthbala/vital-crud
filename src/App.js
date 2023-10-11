import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Dashboard from "./pages/home";
import TodoAddForm from "./component/todoForm/todoAdd";
import EditTodoForm from "./component/todoForm/todoFormEdit";
import Header from "./component/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/todo" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="todo/edit/:id" element={<EditTodoForm />} />
            <Route path="todo/add/" element={<TodoAddForm />} />

            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
