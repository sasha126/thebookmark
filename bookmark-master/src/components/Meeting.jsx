import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';


class Meeting extends Component {
    constructor(props){
        super(props);
        this.state={
            requests:[], 
            update:false
        };
        this.handleTrans=this.handleTrans.bind(this);
        this.handleSumma=this.handleSumma.bind(this);
    }

    handleTrans = (trans)=> {
        var tid=trans;
        var disp3 ="video"+this.state.requests[this.props.i]['details']['videono']+"transcriptdownload";
        this.downloadTextFile(disp3,tid);    
    }

    handleSumma = (summa) => {
        var tid=summa;
        var disp3 ="video"+this.state.requests[this.props.i]['details']['videono']+"summarydownload";
        this.downloadTextFile(disp3,tid);
    }


    componentDidMount() {
        var videoDetails;
    axios.post(this.props.host+'/standingFunction', {
      "username" : this.props.loggedInUser
  }).then(response=>{videoDetails = response['data']['videoDetails'];
  
  const arr = Object.keys(videoDetails).map((key) => [key, videoDetails[key]]);
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

content1.push(this.state.requests[this.props.i].summary);
var content2=[];

content2.push(this.state.requests[this.props.i].transcript);

var content3=[];

content3.push(this.state.requests[this.props.i].details['description']+"<br>");
var vst;

if(this.state.requests[this.props.i]['details']['audiosavedstatus']=="Done"){
    vst = "🟠 Transcription Under Progress";
}
else{
    vst = "🟡 Uploading Under Progress";
}
if(this.state.requests[this.props.i]['details']['summarystatus']=="Done"){
    vst = "🟢 Processing Completed";
}

$('li#headhere'+this.props.i).on(action, function() {
    // Get next element
    $(this).next()
        .slideToggle(speed)
    // Select all other answers
            .siblings('li.hide')
                .slideToggle();
});
var head=document.getElementById("headhere"+this.props.i);
head.innerHTML="Video "+this.state.requests[this.props.i]['details']['videono']+"&nbsp;&nbsp;&nbsp"+vst;


var disp1 =document.getElementById("here1"+this.props.i);
var disp2 =document.getElementById("here2"+this.props.i);
var disp3 =document.getElementById("here3"+this.props.i);
disp1.innerHTML="<b>Title</b><br/>"+content3[0];
if(this.state.requests[this.props.i]['details']['summarystatus']=="Done") {
    var no=this.state.requests[this.props.i]['details']['videono'];
if(this.state.requests[this.props.i]['details']['summarystatus']=="Done") 
disp2.innerHTML="<b>Transcript</b><br/>"+content2[0]+"<br/><a id='video"+no+"transcriptdownload' href='' download='video"+no+"_transcript.txt'><i class='fa fa-download'/></a>";

if(this.state.requests[this.props.i]['details']['summarystatus']=="Done")
disp3.innerHTML="<b>Summary</b><br/>"+content1[0]+"<br/><a id='video"+no+"summarydownload' href='' download='video"+no+"_summary.txt'><i class='fa fa-download'/></a>";

$("#"+"video"+this.props.i+"transcriptdownload").on(action,this.handleTrans(content2[0]));
$("#"+"video"+this.props.i+"summarydownload").on(action,this.handleSumma(content1[0]));
}
});

var action="click";
var speed="500";

}

downloadTextFile(dwnldbtn,tid){
    var text = tid.trim();
    var data = new Blob([text], {type:'text/plain'});
    var url = window.URL.createObjectURL(data);
    document.getElementById(dwnldbtn).href=url;
}

    render() {
        return(
            <div>
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                            <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
        <script src="js/scripts.js"></script>
                    <div id="container">
            <ul className="faq">
                <li id={"headhere"+this.props.i} className="headhere"><i class="fa fa-angle-down"></i></li>
        
                <li id={"here1"+this.props.i} className="hide"></li>
                <li id={"here2"+this.props.i} className="hide" >In Progress</li>
                <li id={"here3"+this.props.i} className="hide" >In Progress</li>
            </ul>
            </div>
    
            </div>
        );
    }
}

export default Meeting