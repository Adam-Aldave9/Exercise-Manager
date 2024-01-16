import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import Navbar from "./navbar.component";

function EditExercise(){
    const {id} = useParams();
    const {userid} = useParams()
    const [exercise, setExercise] = useState({
        description: "",
        duration: 0,
        date: "",
        users: id
    });

    const [rerender, setRerender] = useState(false)
    useEffect(() => {
       if(rerender === false) first()
    }, [rerender]);
    

    async function first(){
        const body = {
            service: "Exercise",
            method: "GET",
            payload: {
                id: id,
                userid: userid
            }
        }

        await axios.put(process.env.REACT_APP_APIGW_URI, body) //id directly from url 
            .then(res =>{
                setExercise({
                    description: res.data.body[0].description,
                    duration: res.data.body[0].duration,
                    date: res.data.body[0].date,
                    users: res.data.body[0].users
                });
                setRerender(true)
            })
            .catch(err => console.log(err));
    }
    function onChangeDescription(e) {
        setExercise({
            ...exercise,
            description: e.target.value
        })
      }
    
      
    function onChangeDuration(e) {
        setExercise({
            ...exercise,
            duration: e.target.value
        })
      }
    
      
    function onChangeDate(e) {
        setExercise({
            ...exercise,
            date: e.target.value
        })
      }
    
      
    function onSubmit(e) {
        e.preventDefault();
        const body = {
            service: "Exercise",
            method: "UPDATE",
            payload: exercise
        }
    
        axios.put(process.env.REACT_APP_APIGW_URI, body)
          .then(res => {console.log(res.data); window.location = `/exercises/${userid}`;})//id is exercise id. adjust
          .catch(err => console.log(err));
    }

    return (
        <div>
            { rerender === false ? (<h1>LOADING</h1>) : (
            <div>
                <Navbar id={id}></Navbar>
                <h3>Edit Exercise Log</h3>
                <form onSubmit={onSubmit}>

                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text" required className="form-control" value={exercise.description} onChange={onChangeDescription}/>
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" className="form-control" value={exercise.duration} onChange={onChangeDuration}/>
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div> <input type="text" value={exercise.date} onChange={onChangeDate}/></div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
            </div>
            )}
        </div>
    )


  }

  export default EditExercise;

