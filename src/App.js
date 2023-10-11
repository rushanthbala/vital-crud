import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/login";
import Dashboard from "./pages/home";
import TodoAddForm from "./component/todoForm/todoAdd";
import EditTodoForm from "./component/todoForm/todoFormEdit";
import Header from "./component/Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          {user && (
            <Routes>
              <Route path="/todo" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="todo/edit/:id" element={<EditTodoForm />} />
              <Route path="todo/add/" element={<TodoAddForm />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
          {!user && (
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>
          )}
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
