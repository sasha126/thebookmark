import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Title from './Title'
import SignUp from './SignUp'
import NavBar from './NavBar'
import Right from './Right'
import axios from 'axios';
import logo from "../images/logo.png";

class SignIn extends Component {
constructor() {
    super();
    this.state = {
      UN: "",
      pswd: "",
      host:"http://192.168.1.33:5000",
      requests: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signup = this.signup.bind(this);
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

    axios.post(this.state.host+'/signin', {
      "username" : this.state.UN,
      "password" : this.state.pswd
  }).then(response=>{
      console.log(response.data);
      if(response.data['status']=="Success"){
        alert(response.data['message']);
          this.next();
      }
      else{
          alert(response.data['message']);
      }
  }).catch(error=>console.error(error));
  }

  next() {

    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.state.UN}/>
      <main>
             <Right host={this.state.host} loggedInUser={this.state.UN}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  signup() {
    ReactDOM.render(<div className="App">
 
 <Title/>

<SignUp host={this.state.host}/>
  
      </div>,document.getElementById('root'));
  }

render() {
    return (
      
        <div className="signinform">
         <img className="logo" src={logo}/>
            <br />
            <br />
            <h1>Sign In</h1>
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
                <a href="#" onClick={this.signup}>
                  Sign Up now
                </a>
                <br />
                <br />
                
          
            </form>
          </div>
        
     
    );
  }

}
export default SignIn