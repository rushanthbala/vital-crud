import {  FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    window.location.href ="/"
  };

  return (
    <>
    {
      user ? 
      <header className="header">
      <div className="logo">
        <Link to="/">Todo </Link>
      </div>
      <ul>
          <>
          <li>
              <button className="btn" >
                {user.name}
              </button>
            </li>
            <li>
              <button className="btn" >
                Add
              </button>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
      </ul>
    </header>
    :<></>

    }
    </>
    
  );
}

export default Header;
