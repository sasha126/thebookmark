import React, { Component } from 'react';
import userImg from "../images/user.jpg"
import axios from 'axios';
import NavBar from './NavBar';
import PastMeetings from './PastMeetings';
import Left from './Left';
import VirtualScribe from './VirtualScribe';
import ReactDOM from "react-dom";


class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      update:false
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleClick = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <PastMeetings loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  handleClick1 = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <Left loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  handleClick2 = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <VirtualScribe loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  handleSubmit = () => {
    var host = "http://192.168.1.34:5000"
   
     var dname = document.getElementById("dname");
    var duname = document.getElementById("duname");
     var demail = document.getElementById("demail");
     var dcompany = document.getElementById("dcompany");
     var dpassword=document.getElementById("dpassword");
     var dopassword=document.getElementById("dopassword");

     if(dname.value=="" || duname.value=="" || demail.value=="" || dcompany.value==""){
      alert("Fields cannot be empty!!");
  }

  axios.post(host+'/updateProfile', {
    "username" : duname.innerHTML,
    "email" : demail.innerHTML,
    "personName" : dname.innerHTML,
    "company" : dcompany.innerHTML,
    "currentPassword" : dopassword.innerHTML,
    "newPassword" : dpassword.innerHTML
}).then(response=>{
    if(response.data['status']=="Success")
    alert("Profile updated");
    else
    alert("Failed");
    this.setState({update:true},this.componentDidMount);
}).catch(error=>console.error(error));
  }

  componentDidMount() {
    var host = "http://192.168.1.34:5000"
    axios.post(host+'/standingFunction', {
      "username" : this.props.loggedInUser
  }).then(response=>{
     var accountDetails = response['data']['AccountDetails'];
     var dname = document.getElementById("dname");
     var dpassword=document.getElementById("dpassword");
     var dopassword=document.getElementById("dopassword");
       var     duname = document.getElementById("duname");
     var       demail = document.getElementById("demail");
     var       dcompany = document.getElementById("dcompany");
    var        dvideocount = document.getElementById("dvideocount");
   var         dscribecount = document.getElementById("dscribecount");
   var         dlastactivity = document.getElementById("dlastactivity");
   var         dlastvideotitle = document.getElementById("dlastvideotitle");
   var         dlastnotetitle = document.getElementById("dlastnotetitle"); 

   dpassword.innerHTML="New Password"
  dopassword.innerHTML="Current Password"
   
      dname.innerHTML = accountDetails['personName'];
     duname.innerHTML = accountDetails['username'];
     demail.innerHTML = accountDetails['email'];
     dcompany.innerHTML = accountDetails['company'];
     dvideocount.innerHTML = "You have summarized " +accountDetails['videocount'] + " videos";
      dscribecount.innerHTML = "You have taken " +accountDetails['transcriptcount'] + " notes";
      dlastactivity.innerHTML = "Your last activity was on : " +accountDetails['lastactivity'];
      dlastvideotitle.innerHTML = "Last video summarized : "+accountDetails['lastvideo'];
      dlastnotetitle.innerHTML = "Last audio summarized : "+accountDetails['lastnotes'];
  }).catch(error=>console.error(error));
  }
    
    render() {
        return (
          <div>
          <h2> My Profile </h2>
          <div className="posi">
          
          <div className="profile-car">
              <span className="bar"></span>
                <img src={userImg} alt="user" />
        <h4> Hello {this.props.loggedInUser}! </h4>
                <ul>
                        <div className="disp" id="dname" contentEditable="true"> Name </div>
                  
                        <div className="disp" id="duname" contentEditable="true"> Username </div>
                 
                        <div className="disp" id="demail" contentEditable="true"> Email ID </div>
               
                        <div className="disp" id="dcompany" contentEditable="true"> Organization Name </div>
               
                        <div className="disp" id="dvideocount"> You have summarized _ videos </div>
                    
                        <div className="disp" id="dscribecount"> You have used the scribe _ times </div>
                  
                        <div className="disp" id="dlastactivity"> Your last activity was _ time ago </div>
               
                        <div className="disp" id="dlastvideotitle"> Last video title :  </div>
               
                        <div className="disp" id="dlastnotetitle"> Last note title :  </div>

                        <div className="disp" id="dopassword" contentEditable="true"></div>

                        <div className="disp" id="dpassword" contentEditable="true"></div>

                </ul>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
           
            <div className="rightside">
             <button onClick={this.handleClick}>View Past Transcripts</button>
             <button onClick={this.handleClick1}>Submit New Video</button>
             <button onClick={this.handleClick2}>Take New Notes</button>
         </div>
         </div>
            </div>
 
            )
        }
    }
    
export default Profile
