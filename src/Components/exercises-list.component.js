import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../styles/exercises-list-comp.css";

function Exercise(props){
    return(
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
      </tr>
    )
}

class ExercisesList extends Component{
    constructor(props){
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {exercises: []};//component class variable
    }

    componentDidMount(){ //before anything displays
        axios.get("http://localhost:5000/exercises/")
        .then(res => {
            this.setState({exercises: res.data}) //put all db items in exercises
        })
        .catch(err => {console.log(err)});
    }

    deleteExercise(id){
        axios.delete("http://localhost:5000/exercises/"+id)
            .then(res => { console.log(res.data)});

        this.setState(
            //for every item in exercises arr, return if item._id !== id
            {exercises: this.state.exercises.filter(item => item._id !== id)}
            );
    }

    exerciseList(){
        return this.state.exercises.map(currentExercise =>{
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}></Exercise>
        })
    }

    render(){
        return (
            <div className="main">
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{ this.exerciseList() }</tbody> {/**method runs on start because of () */}
                </table>
            </div>
        )
    }
}

export default ExercisesList;