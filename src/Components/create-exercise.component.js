import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar.component";

export default function CreateExercise(){
    const params = useParams()
    const [exercise, setExercise] = useState({
            descipt: "",
            duration: 0,
            date: "",
            users: params.id
    })

    function onChangeDescription(e){
        setExercise({
            ...exercise,
            descipt: e.target.value,
        });
    }

    function onChangeDuration(e){
        setExercise({
            ...exercise,
            duration: e.target.value,
        });
    }

    function onChangeDate(e){
        setExercise({
            ...exercise,
            date: e.target.value
        });
    }

    function onSubmit(e){
        e.preventDefault();
        const body = {
           service: "Exercise",
           method: "PUT",
           payload: exercise
        }

        axios.put(process.env.REACT_APP_APIGW_URI, body)
        .then(res => console.log(res.data.body))
        .catch(err => console.log(err));
        
        console.log(exercise);
        window.location = `/exercises/${params.id}`; //take back to homepage
      }
  
        return (
            <div>
            <Navbar id={params.id}></Navbar>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text" required className="form-control" value={exercise.descript} onChange={onChangeDescription}/>
              </div>

              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input type="text" className="form-control" value={exercise.duration} onChange={onChangeDuration}/>
              </div>

              <div className="form-group">
                <label>Date: </label>
                <div> <input type="text" value={exercise.date} onChange={onChangeDate}/> </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
}