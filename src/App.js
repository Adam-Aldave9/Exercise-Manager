import React from "react";
import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./Components/navbar.component"
import ExercisesList from "./Components/exercises-list.component";
import EditExercise from "./Components/edit-exercise.component";
import CreateExercise from "./Components/create-exercise.component";
import CreateUser from "./Components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        <br></br>
        <Routes>
          <Route exact path="/" element={<ExercisesList></ExercisesList>}/>
          <Route path="/edit/:id" element={<EditExercise></EditExercise>}/>
          <Route path="/create" element={<CreateExercise></CreateExercise>}/>
          <Route path="/user" element={<CreateUser></CreateUser>}/>
        </Routes>
      </div>
   </Router>
    
  );
}

export default App;
