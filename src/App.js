import React from "react";
import "./styles/App.css"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import ExercisesList from "./Components/exercises-list.component";
import EditExercise from "./Components/edit-exercise.component";
import CreateExercise from "./Components/create-exercise.component";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <div className="container">
        <br></br>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route exact path="/exercises/:userid" element={<ExercisesList></ExercisesList>}/>
          <Route path="/edit/:userid/:id" element={<EditExercise></EditExercise>}/>
          <Route path="/create/:id" element={<CreateExercise></CreateExercise>}/>
        </Routes>
      </div>
   </Router>
    
  );
}

export default App;
