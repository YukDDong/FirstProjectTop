import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "../movie/route/Detail";
import Home from "../movie/route/Home";

function Movie() {
  return (
    <Router>
      <Switch>
        <Route path="/hello">
          <h1>Hello</h1>
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default Movie;
