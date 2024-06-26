import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/notes" component={NoteList} />
        <Route path="/create" component={CreateNote} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
