import React, { Component } from 'react';
import Thumbnail from "../images/placeholder-image.jpg"
import axios from 'axios';


class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: '',
          loggedinUser: this.props.loggedinUser
        };

        this.handleClick = this.handleClick.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      handleClick(e) {
        e.preventDefault();

        var host = "http://192.168.1.34:5000"

    if(this.props.loggedInUser==""){
      alert("No user is currently logged in!\nYou must be signed-in to use our services");
      return;
  }


      var v = document.getElementById("video");
      var vfile = v.files[0];
      alert(vfile);

      var formData = new FormData();
      formData.append("video", vfile);
      formData.append("username", this.props.loggedInUser);

      axios.post(host+'/receiveVideo', formData, {headers : {'Content-Type':'multipart/form-data'}}
      ).then(response=>{
          
          console.log(response.data);
          
          if(response.data['status']=="Success"){
              alert("Success");
          }
          else{
              alert("Failure");
          }
      }).catch(error=>console.error(error));


      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      renderVideo (event) {
        event.preventDefault();

        if(this.state.value !== ''){
            let x='<iframe src="'+this.state.value+'"> </iframe>';
            document.getElementById("video-block").innerHTML= x;
        }

      }
    render() {
        return (
          <div>
              <h2> Meeting Summarizer </h2>
              <form onSubmit={this.renderVideo}>
                <input type="text" placeholder="Upload Video / Paste Video Link" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
            <form>
                <input id="video" type="file" />
                <input type="submit" value="Submit" onClick={this.handleClick}/>
            </form>
             <div id="video-block">
                 <img src={Thumbnail} alt="video goes here"/>
             </div>   
             <button onClick={this.handleClick}> Send Link / Video </button>

          </div>
            )
        }
    }
    
export default Summary