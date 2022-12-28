import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function EditExercise(){
    const [state, setState] = useState({
        username: "",
        description: "",
        duration: 0,
        date: new Date(),
        users: []
    });

    const ref = useRef("userInput");
    const lastState = useRef({});
    const initialRender = useRef(true);
    const {id} = useParams();
    
    useEffect(() => {
        if(initialRender.current){
            second();
            lastState.current = state;
            initialRender.current = false;
        }
        else setState(lastState.current);
        first();
    }, [initialRender.current]);
    

    async function first(){
        await axios.get(`http://localhost:5000/exercises/${id}`) //id directly from url 
            .then(res =>{
                setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date),
                    users: state.users
                });
            })
            .catch(err => console.log(err));
    }
    async function second(){
        await axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                setState({
                    ...state,
                    users: response.data.map(user => user.username)
                })
            }
        },)
        .catch((error) => {
            console.log(error);
        });
    }
    
    
    function onChangeUsername(e) {
        setState({
            description: state.description,
            duration: state.duration,
            date: state.date,
            users: state.users,
            username: e.target.value
        })
      }
    
      
    function onChangeDescription(e) {
        setState({
            username: state.username,
            duration: state.duration, 
            date: state.date,
            users: state.users,
            description: e.target.value
        })
      }
    
      
    function onChangeDuration(e) {
        setState({
            username: state.username,
            description: state.description, 
            date: state.date,
            users: state.users,
            duration: e.target.value
        })
      }
    
      
    function onChangeDate(newDate) {
        setState({
            username: state.username,
            description: state.description,
            duration: state.duration, 
            date: newDate,
            users: state.users
        })
      }
    
      
    function onSubmit(e) {
        e.preventDefault();
    
        const exercise = {
          username: state.username,
          description: state.description,
          duration: Number(state.duration),
          date: state.date
        }
    
        console.log(exercise);
    
        axios.post(`http://localhost:5000/exercises/update/${id}`, exercise)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
    
        window.location = '/';
      }
    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Username: </label>
                    <select ref={ref} required className="form-control" value={state.username} onChange={onChangeUsername}>
                        {
                            state.users.map((user) => { return <option key={user} value={user}>{user} </option>;})
                        }
                    </select>
                </div>

                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text" required className="form-control" value={state.description} onChange={onChangeDescription}/>
                </div>

                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input type="text" className="form-control" value={state.duration} onChange={onChangeDuration}/>
                </div>

                <div className="form-group">
                    <label>Date: </label>
                    <div> <DatePicker selected={state.date} onChange={onChangeDate}/></div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )


  }

  export default EditExercise;

