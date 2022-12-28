import React, {Component} from "react";
import axios from "axios";

export default class CreateUser extends Component{
    constructor(props){ //for path prop
        super(props); // need for constructor of sub class

        //define "this" for the class
        this.onChangeUsername = this.onChangeUsername.bind(this); //bind this to each of the methods
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit(e){
        e.preventDefault(); //prevents html form default behaviour
        const user = {
            username: this.state.username
        }

        console.log(user);

        //add user input for "user" from frontend to database 
        axios.post("http://localhost:5000/users/add", user) //send http post request to endpoint which expects json (user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        this.setState({
            username: ""
        });
    }


    render(){
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Username: </label>
                        <input  type="text" required className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}