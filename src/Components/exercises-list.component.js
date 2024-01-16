import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar.component";
import "../styles/exercises-list-comp.css";

function ExercisesList(){
    const params = useParams()
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        const id = params.userid
        const body = {
            service: "Exercise",
            method: "GET",
            payload: {
                id: id
            }
        }
        axios.put(process.env.REACT_APP_APIGW_URI, body)
        .then(res => {
            setExercises(res.data.body) //put all db items in exercises
        })
        .catch(err => {console.log(err)});
    
    }, [])

    function deleteExercise(id){
        const body = {
            service: "Exercise",
            method: "DELETE",
            payload: {
                id: id
            }
        }
        axios.put(process.env.REACT_APP_APIGW_URI, body)
            .then(res => { console.log(res.data)});

        setExercises(
            exercises.filter(item => String(item.exercise_id) !== id)
            );
    }

    function exerciseList(){
        return exercises.map(currentExercise =>{
            return <Exercise exercise={currentExercise} deleteExercise={deleteExercise}></Exercise>
        })
    }

    function Exercise(props){
        return(
            <tr>
                <td>{props.exercise.description}</td>
                <td>{props.exercise.duration}</td>
                <td>{props.exercise.date}</td>
                <td>
                    <Link to={`/edit/${params.userid}/`+props.exercise.exercise_id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise.exercise_id) }}>delete</a>
                </td>
          </tr>
        )
    }

        return (
            <div className="main">
                <Navbar id={params.userid}></Navbar>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{ exerciseList() }</tbody>
                </table>
            </div>
        )
}

export default ExercisesList;