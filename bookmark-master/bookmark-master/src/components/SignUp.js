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
      email: "",
      org: "",
      name: "",
      pswdConf: "",
      requests: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeC = this.handleChangeC.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
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

    handleChangeC = (e) => {
      let target = e.target;
      let name = target.value;
      this.setState({pswdConf:name},function() { console.log("setState completed", this.state.pswdConf) });
    }

    handleChange2 = (e) => {
      let target = e.target;
      let nm = target.value;
      this.setState({name:nm},function() { console.log("setState completed", this.state.name) });
      }

      handleChange3 = (e) => {
        let target = e.target;
        let name = target.value;
        this.setState({email:name},function() { console.log("setState completed", this.state.email) });
        }

        handleChange4 = (e) => {
          let target = e.target;
          let name = target.value;
          this.setState({org:name},function() { console.log("setState completed", this.state.org) });
          }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.pswd!=this.state.pswdConf) {
      alert("Entered passwords do not match");
      return false;
    }

    var host = "http://192.168.1.34:5000"

    axios.post(host+'/signup', {
      "username" : this.state.UN,
      "password" : this.state.pswd,
      "email" : this.state.email,
      "personName" : this.state.name,
      "company":this.state.org
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

                <input
                  type="password"
                  className="username"
                  placeholder="Confirm Password"
                  name="pswdConf"
                  value={this.state.pswdConf}
                  onChange={this.handleChangeC}
                  required
                />
                <br></br>

                <input
                  type="text"
                  className="username"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange2}
                  required
                />
                <br></br>

                <input
                  type="text"
                  className="username"
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange3}
                  required
                />
                <br></br>
                <input
                  type="text"
                  className="username"
                  placeholder="Organization/Company"
                  name="org"
                  value={this.state.org}
                  onChange={this.handleChange4}
                  required
                />
                <br></br>
                    
            
                <button type="submit" className="sub" value="submit">
                  Sign Up
                </button>
               
                <br />
                <br />
                
          
            </form>
          </div>
        
     
    );
  }

}
export default SignUp