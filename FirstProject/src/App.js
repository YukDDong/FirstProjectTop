import { Route, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './Header.scss'
import Home from './Home/Home';
import Dday from './components/Dday';
import MyTodoList from "./components/MyTodoList";
import Calendar from './components/Calendar';
import MyInfo from './components/MyInfo';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import auth from './hoc/auth';


function App() {
  const history=useHistory()

  const onClickHandler=(e)=>{
    e.preventDefault();
    axios.get('/api/user/logout')
      .then(response=>{
        if(response.data.success){
          alert('로그아웃되었습니다.')
          history.push('/login')
        }else{
          alert('로그아웃 하는데 실패했습니다.')
        }
        
      })
  }

  return (
    <div id="wrap">
      <div id="header">
            <div id="header_in">
                <div id="logo">
                    <Link to='/'>FirstProject</Link>
                </div>
                <Nav variant="pills" defaultActiveKey="/">
                    <Nav.Item>
                        <Nav.Link as={Link} to="/Dday">Dday</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/MyTodoList">MyTodoList</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/Calendar">Calendar</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/MyInfo">MyInfo</Nav.Link>
                    </Nav.Item>
                </Nav>
                <ul className="login_box">
                    <li><Link to="/login">LOGIN</Link></li>
                    <li><Link to="/register">JOIN</Link></li>
                </ul>
                <button onClick={onClickHandler}>로그아웃</button>
            </div>
        </div>
      <div id='contents'>
        <Route path='/' exact={true} component={auth(Home, null, )}></Route>
        <Route path='/Dday' component={auth(Dday, true)}></Route>
        <Route path='/MyTodoList' component={auth(MyTodoList, true)}></Route>
        <Route path='/Calendar' component={auth(Calendar, true)}></Route>
        <Route path='/MyInfo' component={auth(MyInfo, true)}></Route>
        <Route path='/login' component={auth(LoginPage, false)}></Route>
        <Route path='/register' component={auth(RegisterPage, false)}></Route>
      </div>
    </div>
  );
}

export default App;
