import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Header";
import Home from "./routes/Home";
import Movie from "./routes/Movie";
import MyTodoList from "./routes/MyTodoList";
import Calendar from "./routes/Calendar";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import auth from "./hoc/auth";

function App() {
  return (
    <div id="wrap">
      <Header />
      <div id="contents">
        <Route path="/" exact={true} component={auth(Home, null)}></Route>
        <Route path="/Movie" component={auth(Movie, true)}></Route>
        <Route path="/MyTodoList" component={auth(MyTodoList, true)}></Route>
        <Route path="/Calendar" component={auth(Calendar, true)}></Route>
        <Route path="/login" component={auth(LoginPage, false)}></Route>
        <Route path="/register" component={auth(RegisterPage, false)}></Route>
      </div>
    </div>
  );
}

export default App;
