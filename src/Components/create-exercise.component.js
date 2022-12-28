import React, {Component, useRef} from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{
    constructor(props){ //for path prop
        super(props); // need for constructor of sub class

        //define "this" for the class
        this.onChangeUsername = this.onChangeUsername.bind(this); //bind this to each of the methods
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            desciption: "",
            duration: 0,
            date: new Date(),
            users: []
        }
    }
    //lifecycle method
    componentDidMount(){//called before anything displayed on page
       axios.get("http://localhost:5000/users/")
       .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username //first username in db
                })
            }//end of if
       })
       .catch(err => console.log(err));
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }

    onChangeDescription(e){
        this.setState({
            desciption: e.target.value,
        });
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value,
        });
    }

    onChangeDate(date){
        this.setState({
            date: date,
        });
    }

    //when submit button clicked
    onSubmit(e){
        e.preventDefault(); //prevents html form default behaviour
        const exercise = {
            username: this.state.username,
            description: this.state.desciption,
            duration: this.state.duration,
            date: this.state.date
        }

        //add user input for "exercise log" from frontend to backend
        axios.post("http://localhost:5000/exercises/add", exercise) //send http post request to endpoint which expects json (exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        
        console.log(exercise);
        window.location = "/"; //take back to homepage
    }

    render(){
        return (
            <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                {/*select is dropdown menu*/}
                {/**onChange is when user changes selected option in <select> element */}
                <select required className="form-control" value={this.state.username} onChange={this.onChangeUsername}>
                    { 
                        //.map is do for each item in the returned array the callback arg
                        this.state.users.map(function(user) { 
                            //option tag is an option in the select
                            return <option key={user} value={user}> {user} </option>;
                        }) 
                    }
                </select>

              </div>

              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription}/>
              </div>

              <div className="form-group">
                <label>Duration (in minutes): </label>
                <input type="text" className="form-control" value={this.state.duration} onChange={this.onChangeDuration}/>
              </div>

              <div className="form-group">
                <label>Date: </label>
                <div> <DatePicker selected={this.state.date} onChange={this.onChangeDate}/> </div>
              </div>
      
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
    }
}