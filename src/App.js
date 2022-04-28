import React from 'react';
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
//import Form from './Form';
import './index';
import ToDoList from './ToDoList';
import './style.css';




import User from './User';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ToDoList/>} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
