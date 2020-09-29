import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
class PastMeetings extends Component {
  constructor(props){
    super(props);

    this.state={
        requests:[]
    };

    this.updatePastVideos = this.updatePastVideos.bind(this);
    this.hideVideoFullImmediately=this.hideVideoFullImmediately.bind(this);
    this.showHideRow=this.showHideRow.bind(this);
    this.HideRow=this.HideRow.bind(this);
    this.showHideRowImmediately=this.showHideRowImmediately.bind(this);
    this.HideRowImmediately=this.HideRowImmediately.bind(this);
    this.showHideRow=this.showHideRow.bind(this);
  }

  componentDidMount() {
    var host = "http://192.168.1.34:5000";
    var videoDetails;
    axios.post(host+'/standingFunction', {
      "username" : this.props.loggedInUser
  }).then(response=>{videoDetails = response['data']['videoDetails'];
  this.updatePastVideos(response['data']['videoDetails']);
});
  }

  showHideRow = (row) => { 
    $("#" + row).children().slideToggle(500); 
    $("#" + row).toggle(500);
  } 
  
  HideRow(row) { 
    $("#" + row).children().slideUp(500);
    $("#" + row).hide(500); 
  } 
  
  showHideRowImmediately(row) {
   $("#" + row).children().slideToggle(); 
    $("#" + row).toggle();
  } 
  
  HideRowImmediately(row) { 
    $("#" + row).children().slideUp();
    $("#" + row).hide(); 
  } 
  
  
  hideVideoFull(vidid){
    this.showHideRow(vidid+"detailshead");
    this.showHideRow(vidid+"transcripthead");
    this.showHideRow(vidid+"summaryhead");
    this.HideRow(vidid+"detailscell");
    this.HideRow(vidid+"transcriptcell");
    this.HideRow(vidid+"summarycell");
  }
  
  hideVideoFullImmediately(vidid){
    this.showHideRowImmediately(vidid+"detailshead");
    this.showHideRowImmediately(vidid+"transcripthead");
    this.showHideRowImmediately(vidid+"summaryhead");
    this.HideRowImmediately(vidid+"detailscell");
    this.HideRowImmediately(vidid+"transcriptcell");
    this.HideRowImmediately(vidid+"summarycell");
  }
  
  hideParticularDetail(rowid){
    this.showHideRow(rowid);
  }

updatePastVideos(videoJson) {
  var msg="";
  var i;
  var vst;
  for(i in videoJson){
      var vd = videoJson[i];
      var summary = vd['summary'];
      var transcript = vd['transcript'];
      var details = vd['details'];
      var asstatus = details['audiosavedstatus'];
      var summarystatus = details['summarystatus'];
      var title = details['title'];
      var description = details['description'];
      var videono = details['videono'];
      //console.log(vd);

      if(asstatus=="Done"){
          vst = "🟠 Transcription Under Progress";
      }
      else{
          vst = "🟡 Uploading Under Progress";
      }
      if(summarystatus=="Done"){
          vst = "🟢 Processing Completed";
      }

      var a = `
      <br><br>
          <tr className="videoHead" onClick={this.hideVideoFull('video`+videono+`')} id="video`+videono+`">
              <th> Video `+ videono + ': ' + title +` </th>
              <td style="text-align:right;"> `+ vst +` </td>
              <td> <i class="fa fa-chevron-down" aria-hidden="true"></i> </td>
          </tr>
<br>
          <tr className="componentHead" id="video`+videono+`detailshead" onClick="hideParticularDetail('video`+videono+`detailscell')">
                  <td colspan="2" >
                      Video Details
                  </td>
                  <td> <i class="fa fa-chevron-down" aria-hidden="true"></i> </td>
              </tr>
<br>
          <tr id="video`+videono+`detailscell">
              <td className="contentdisplaycell" colspan="3">
                  <div class="contentdisplay">
                      ` + description + `
                  </div>
              </td>
          </tr>
      `;
      msg+=a;

      if(summarystatus=="Done"){
          a=`
              <tr className="componentHead" id="video`+videono+`transcripthead" onClick="hideParticularDetail('video`+videono+`transcriptcell')">
                  <td colspan="2">
                      Transcript
                  </td>
                  <td> <i class="fa fa-chevron-down" aria-hidden="true"></i> </td>
              </tr>
<br>
              <tr id="video`+videono+`transcriptcell">
              <td className="contentdisplaycell" colspan="2">
                  <div className="contentdisplay" id="video`+videono+`transcriptcellDATA">
                      ` + transcript + `
                  </div>
              </td>

            
              <td className="contentdisplaycell">
                  <a id="video`+videono+`transcriptdownload" download="video`+videono+`_transcript.txt" href="">
                      <i class="fa fa-download" onClick="downloadTextFile(video`+videono+`transcriptcellDATA, 'video`+videono+`transcriptdownload')" aria-hidden="true"></i>
                  </a>
              </td>

              </tr>
              <br>
              <tr className="componentHead" id="video`+videono+`summaryhead" onClick="hideParticularDetail('video`+videono+`summarycell')">
                  <td colspan="2">
                      Summary
                  </td>
                  <td>
                      <i class="fa fa-chevron-down" aria-hidden="true">
                      </i>
                  </td>
              </tr>
              <br>
              <tr id="video`+videono+`summarycell">
              <td className="contentdisplaycell" colspan="2" >
                  <div className="contentdisplay" id="video`+videono+`summarycellDATA">
                      ` + summary + `
                  </div>
              </td>

              <td className="contentdisplaycell">
                  <a id="video`+videono+`summarydownload" download="video`+videono+`_summary.txt" href="">
                      <i class="fa fa-download" onClick="downloadTextFile(video`+videono+`summarycellDATA, 'video`+videono+`summarydownload')" aria-hidden="true"></i>
                  </a>
              </td>


              </tr>

          `;
          msg+=a;
      }
  }
  var pastvideos=document.getElementById("pastvideos");
  pastvideos.innerHTML = msg;

  for(i=1; i<=videono; i++){
      this.hideVideoFullImmediately("video"+i);
  }

  

}
   
    render() {
        return (
            <div className="pm">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <h2>Past Meetings </h2>
            <div className="meetings-list">
                    <div id="pastvideos">
                   
                    </div>
           </div>
           </div>

            )
        }
    }
    
export default PastMeetings