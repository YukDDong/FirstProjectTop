import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./Header.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Header() {
  const history = useHistory();

  const onClickHandler = (e) => {
    e.preventDefault();
    axios.get("/api/user/logout").then((response) => {
      if (response.data.success) {
        alert("로그아웃되었습니다.");
        history.push("/login");
      } else {
        alert("로그아웃 하는데 실패했습니다.");
      }
    });
  };

  return (
    <div id="header">
      <div id="header_in">
        <div id="logo">
          <Link to="/">FirstProject</Link>
        </div>
        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link as={Link} to="/Movie">
              Movie
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/MyTodoList">
              TodoList
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/Calendar">
              Calendar
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <ul className="login_box">
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
          <li>
            <Link to="/register">JOIN</Link>
          </li>
        </ul>
        <button onClick={onClickHandler}>로그아웃</button>
      </div>
    </div>
  );
}

export default Header;
