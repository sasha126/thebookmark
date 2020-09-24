import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Title from './Title'
import SignIn from './SignIn'
import axios from 'axios';

class SignUp extends Component {
constructor() {
    super();
    this.state = {
      UN: "",
      pswd: "",
      requests: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange = (e) => {
  let target = e.target;
  let name = target.value;
  this.setState({UN:name},function() { console.log("setState completed", this.state.UN) });
  }

  handleChange1 = (e) => {
    let target = e.target;
    let name = target.value;
    this.setState({pswd:name},function() { console.log("setState completed", this.state.pswd) });
    }

  handleSubmit = (e) => {
    e.preventDefault();

    var host = "http://192.168.1.35:5000"

    axios.post(host+'/signup', {
      "username" : this.state.UN,
      "password" : this.state.pswd
  }).then(response=>{
      console.log(response.data);
      if(response.data['status']=="Success"){
        alert("Success");
          this.next();
      }
      else{
          alert("Failed");
      }
  }).catch(error=>console.error(error));
  }

  next() {
    ReactDOM.render(<div className="App">
 
 <Title/>

<SignIn />
  
      </div>,document.getElementById('root'));
  }

render() {
    return (
      
        <div className="signinform">
         
            <br />
            <br />
            <h1>Sign Up</h1>
            <br />
            <hr color="#a9203a" size="3" />
            <br />
            <br />

            <form className="SignInForm" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="username"
                  placeholder="Username"
                  name="UN"
                  value={this.state.UN}
                  onChange={this.handleChange}
                  required
                />
                <br></br>
                <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  name="pswd"
                  value={this.state.pswd}
                  onChange={this.handleChange1}
                  required
                />
                <br></br>
            
                <button type="submit" className="sub" value="submit">
                  Sign In
                </button>
                <br />
                <br />
                <a href="#">
                  Sign In now
                </a>
                <br />
                <br />
                
          
            </form>
          </div>
        
     
    );
  }

}
export default SignUp