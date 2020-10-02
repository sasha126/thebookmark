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
      update:false,
      edit:false,
      pswd:'',
      npswd:'',
      UN:'',
      nm:'',
      email:'',
      comp:''
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit=this.handleEdit.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.handleChange1=this.handleChange1.bind(this);
  this.handleChange2=this.handleChange2.bind(this);
  this.handleChange3=this.handleChange3.bind(this);
  this.handleChanges=this.handleChanges.bind(this);
  this.handleChanges1=this.handleChanges1.bind(this);
  this.handleChanges2=this.handleChanges2.bind(this);

  }

  handleClick = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <PastMeetings host={this.props.host} loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  handleClick1 = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <Left host={this.props.host} loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

  handleClick2 = () => {
    ReactDOM.render(<div className="App">
 
      <NavBar loggedInUser={this.props.loggedInUser}/>
      <main>
             <VirtualScribe host={this.props.host} loggedInUser={this.props.loggedInUser}/>
      </main>
  
      </div>,document.getElementById('root'));
  }

handleChange(e) {
  let target = e.target;
  let name = target.value;
  this.setState({UN:name},function() { console.log("setState completed", this.state.UN) });
}

handleChange1(e) {
  let target = e.target;
  let name = target.value;
  this.setState({nm:name},function() { console.log("setState completed", this.state.nm) });
  
}

handleChange2(e) {
  let target = e.target;
  let name = target.value;
  this.setState({email:name},function() { console.log("setState completed", this.state.email) });
  
}

handleChange3(e) {
  let target = e.target;
  let name = target.value;
  this.setState({comp:name},function() { console.log("setState completed", this.state.comp) });
  
}

handleChanges(e) {
  let target = e.target;
  let name = target.value;
  this.setState({pswd:name},function() { console.log("setState completed", this.state.pswd) });
  
}

handleChanges1(e) {
  let target = e.target;
  let name = target.value;
  this.setState({npswd:name},function() { console.log("setState completed", this.state.npswd) });
  
}

handleChanges2(e) {
  let target = e.target;
  let name = target.value;
  this.setState({cpswd:name},function() { console.log("setState completed", this.state.cpswd) });
  
}

  handleEdit = () => {
this.setState({edit:true});
var dname = document.getElementById("usersname").innerText;
     var demail = document.getElementById("uemail").innerHTML;
     var dcompany = document.getElementById("ucompany").innerHTML;
     this.setState({UN:this.props.loggedInUser,nm:dname,email:demail,comp:dcompany});
  }

  handleSubmit = (e) => {
   if(this.state.npswd!='') {
     if(this.state.npswd!=this.state.cpswd) {
     alert("Password confirmation failed");
     return false;
     }
   }
  axios.post(this.props.host+'/updateProfile', {
      "username" : this.props.loggedInUser,
      "email" : this.state.email,
      "personName" : this.state.nm,
      "company" : this.state.comp,
      "currentPassword" : this.state.pswd,
      "newPassword" : this.state.npswd
  }).then(response=>{
      if(response.data['status']=="Success") 
        alert("Profile Updated");
      else 
      alert("Failed");
      this.setState({update:true,edit:false,pswd:'',npswd:'',cpswd:''},this.componentDidMount);
  }).catch(error=>console.error(error));

  }

  componentDidMount() {
    axios.post(this.props.host+'/standingFunction', {
      "username" : this.props.loggedInUser
  }).then(response=>{
     var accountDetails = response['data']['AccountDetails'];
     var dname = document.getElementById("usersname");
     var demail = document.getElementById("uemail");
     var dcompany = document.getElementById("ucompany");
    var dvideocount = document.getElementById("dvideocount");
   var dscribecount = document.getElementById("dscribecount");
   var dlastactivity = document.getElementById("dlastactivity");
   var dlastvideotitle = document.getElementById("dlastvideotitle");
   var dlastnotetitle = document.getElementById("dlastnotetitle"); 

      dname.innerHTML = accountDetails['personName'];
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
          <div className="posi">
          
          <div className="profile-car">
              <span className="bar"></span>
                <img src={userImg} alt="user" />
        <h4> Hello <p id="usersname"></p></h4>
        
               {!this.state.edit && <ul>
               
               <p id="ucompany">  </p>
               <br/>
               <div className="disp" id="duname"><b>bookmark/</b>{this.props.loggedInUser}</div>
               <div className="disp" id="uemail" >  </div>
                        <div className="disp" id="dvideocount"> You have summarized _ videos </div>
                    
                        <div className="disp" id="dscribecount"> You have used the scribe _ times </div>
                  
                        <div className="disp" id="dlastactivity"> Your last activity was _ time ago </div>
               
                        <div className="disp" id="dlastvideotitle"> Last video title :  </div>
               
                        <div className="disp" id="dlastnotetitle"> Last note title :  </div>
                        <button onClick={this.handleEdit}>Edit</button>
                </ul>
    }
                {this.state.edit && <div>
                  <input
                  type="text"
                  className="username"
                  placeholder="Username"
                  id="uname"
                  value={this.state.UN}
                  onChange={this.handleChange}
                  disabled
                />
                <br></br>

                <input
                  type="text"
                  className="username"
                  placeholder="Email"
                  id="eemail"
                  value={this.state.email}
                  onChange={this.handleChange2}
                  required
                />
                <br></br>

                <input
                  type="text"
                  className="username"
                  placeholder="Name"
                  id="nm"
                  value={this.state.nm}
                  onChange={this.handleChange1}
                  required
                />
                <br></br>

                <input
                  type="text"
                  className="username"
                  placeholder="Company/Organization name"
                  id="comp"
                  value={this.state.comp}
                  onChange={this.handleChange3}
                  required
                />
                <br></br>

                  <input
                  type="password"
                  className="password"
                  placeholder="Password"
                  id="dopassword"
                  value={this.state.pswd}
                  onChange={this.handleChanges}
                  required
                />
                <br></br>

                <input
                  type="password"
                  className="password"
                  placeholder="New Password"
                  id="dpassword"
                  value={this.state.npswd}
                  onChange={this.handleChanges1}
                />
                <br></br>

                <input
                  type="password"
                  className="password"
                  placeholder="Confirm New Password"
                  name="pswd"
                  value={this.state.cpswd}
                  onChange={this.handleChanges2}
                />
                <br></br>
                <button onClick={this.handleSubmit}>Submit Changes</button>
                  </div>}
                
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
