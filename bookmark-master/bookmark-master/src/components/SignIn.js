import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Right from './Right'
import NavBar from './NavBar'
import Left from './Left.js'


class SignIn extends Component {
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

componentDidMount() {
  fetch(`http://ip.jsontest.com/`)
            .then(res => res.json())
            .then(requests => this.setState({requests}, 
              () => console.log('requests fetched',requests)));
}

handleChange(e) {
  let target = e.target;
  let name = target.value;
  this.setState({UN:name});
  }

  handleChange1(e) {
    let target = e.target;
    let name = target.value;
    this.setState({pswd:name});
    }

  handleSubmit(e) {
      ReactDOM.render(<div className="App">
 
      <NavBar />
      <main>
      <Left />
      <Right />
      </main>
  
      </div>,document.getElementById('root'));
  }

render() {
    return (
      
        <div className="signinform">
         
            <br />
            <br />
            <h1>Sign In</h1>
            <br />
            <hr color="#a9203a" size="3" />
            <br />
            <br />

            <form onSubmit={this.handleSubmit} className="SignInForm">
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