import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import Login from "./components/Login";
import Register from "./components/Register";
import NoteList from "./components/NoteList";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import CategoryList from "./components/CategoryList";
import CreateCategory from "./components/CreateCategory";
import EditCategory from "./components/EditCategory";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notes" element={<NoteList />} />
            <Route path="/notes/create" element={<CreateNote />} />
            <Route path="/notes/edit/:id" element={<EditNote />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CreateCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
