import React, { Component } from 'react';
import Thumbnail from "../images/placeholder-image.jpg"
class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleClick = this.handleClick.bind(this);
        this.renderVideo = this.renderVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      handleClick() {
        console.log('Click event goes here');
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
                <input type="file"  value='' onChange='' />
                <input type="submit" value="Submit" />
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