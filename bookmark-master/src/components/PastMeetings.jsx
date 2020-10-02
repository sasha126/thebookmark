import React, { Component } from 'react';
import axios from 'axios';
import Meeting from './Meeting';
import ReactDOM from "react-dom";
import NavBar from './NavBar';

class PastMeetings extends Component {
  constructor(props){
    super(props);

    this.state={
        requests:[],
        elements:[],
        update:false,
        num:0
    };
    this.handleClick=this.handleClick.bind(this);
    this.default=this.default.bind(this);
  }

  handleClick = () => {
    this.setState({num: this.state.num + 1},this.default(this.state.num));
  }

  default = (key) => {
    var videoDetails1;
    axios.post(this.props.host+'/standingFunction', {
      "username" : this.props.loggedInUser
  }).then(response=>{videoDetails1 = response['data']['videoDetails'];

  
  const arr = Object.keys(videoDetails1).map((key) => [key, videoDetails1[key]]);
var res=[];
var result=[];
  result=arr;

  for(var i in result) {
  res.push(result[i]);
 
}
this.state.requests=res;
var t=[];
t.push(this.state.requests.map(item=> (item[1])));
t=t[0];
this.state.requests=t;
var content1=[];
if(this.state.requests.length>0) {
content1.push(this.state.requests[0].summary+"<br>");

var content2=[];

content2.push(this.state.requests[0].transcript+"<br>");

var content3=[];

content3.push(this.state.requests[0].details['description']+"<br>");

console.log(this.state.requests[0]['details']['videono']);

var ele=[];
var n=this.state.requests.length;
var j;
for (j=0;j<n;j++) {
ele.push(<Meeting i={j} host={this.props.host} loggedInUser={this.props.loggedInUser}/> );
}
this.state.elements=ele;
console.log(this.state.elements);

ReactDOM.render(<div key={key}>
 
               {this.state.elements}
    
        </div>,document.getElementById('past'));
}
});
  }

  componentDidMount() {
this.default(0);

  }

  
   
    render() {
       
        return (
            <div id="pastmeet" className="pm">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>                            
            <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
        <script src="js/scripts.js"></script>

        <h2>Past Meetings </h2>
            
                <div className="meetings-list"> 
                
                   <div id="past">        
                        <p>No past meetings to display</p>
                        </div>
           </div>
           <div id="syncout">
           <button id="sync" onClick={this.handleClick}>Sync with Server</button>
           </div>
           </div>
            )
        }
    }
    
export default PastMeetings