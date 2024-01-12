import Home from "./pages/Home";
import PhotoListCategory from "./pages/PhotoListCategory";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Bag from "./pages/Bag";
import PhotoPage from "./pages/PhotoPage";
import Downloads from "./pages/Downloads";
import PhotoListFormat from "./pages/PhotoListFormat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/photos/:category">
          <PhotoListCategory />
        </Route>
        <Route path="/photoz/:format">
          <PhotoListFormat />
        </Route>
        <Route path="/photo/:id">
          <PhotoPage />
        </Route>
        <Route path="/bag">
          <Bag />
        </Route>
        <Route path="/download/:id">
          <Downloads />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
