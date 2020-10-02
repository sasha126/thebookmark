import React, { Component } from 'react';
import tbm from "../videos/tbm.mp4";
import axios from 'axios';
import $ from 'jquery';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          desc: '',
          keywords:'',
          sp: '',
          length:'',
          loggedinUser: this.props.loggedinUser
        };

        this.handleClick = this.handleClick.bind(this);
        this.renderVideo=this.renderVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
      }

      handleClick(e) {
        e.preventDefault();

    if(this.props.loggedInUser==""){
      alert("No user is currently logged in!\nYou must be signed-in to use our services");
      return;
  }


      var v = document.getElementById("video");
      var vfile = v.files[0];
      alert("Video submitted. Please wait while processing takes place");

      var formData = new FormData();
      formData.append("video", vfile);
      formData.append("videotitle", this.state.value);
      formData.append("videodescription", this.state.desc);
      formData.append("videokeyword", this.state.keywords);
      formData.append("username", this.props.loggedInUser);
      
      axios.post(this.props.host+'/receiveVideo', formData, {headers : {'Content-Type':'multipart/form-data'}}
      ).then(response=>{
          
          console.log(response.data);
          
          if(response.data['status']=="Success"){
              alert("Processing complete");
          }
          else{
              alert(response.data['message']);
          }
      }).catch(error=>console.error(error));

      }

      handleChange(event) {
        this.setState({value: event.target.value},function() {console.log(this.state.value)});
      }

      handleChange1(event) {
        this.setState({desc: event.target.value},function() {console.log(this.state.desc)});
      }
      handleChange2(event) {
        this.setState({keywords: event.target.value},function() {console.log(this.state.keywords)});
      }

     renderVideo = (e) => {
      var vid=document.getElementById("video_here");
      vid.src = URL.createObjectURL(e.target.files[0]);
      var s=vid.src;
      var block=document.getElementById("video-block");
      block.innerHTML="<video src="+ s +" controls autoPlay loop/>";
      }

    render() {
        return (
          <div>
              <h2> Meeting Summarizer </h2>  
             <form onSubmit={this.handleClick}>
                <input type="text" placeholder="Video Title" value={this.state.value} onChange={this.handleChange} required/>
               <div className="outerRightForm">
                <div id="video-block">
                 <video src={tbm} id="video_here" alt="video goes here" controls autoPlay loop/>
                 </div>
             <div className="rightForm">
                <input type="textarea" rows="2" placeholder="Video Description" value={this.state.desc} onChange={this.handleChange1} required/><br></br>
                <input type="textarea" rows="2" placeholder="Key Words" value={this.state.keywords} onChange={this.handleChange2} required/><br></br>
                <input type="text" placeholder="Number of Speakers" disabled/>
                <input type="text" placeholder="Video Length" disabled />
                <input id="video" type="file" onChange={this.renderVideo}/><br></br>
                </div>
                </div>
                <input type="submit" id="subm" value="Submit" />
            </form>
          </div>
            )
        }
    }
    
export default Summary