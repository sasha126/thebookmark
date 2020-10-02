import React, { Component } from 'react';
import Profile from './Profile';
import Meeting from './Meeting';
import VirtualScribe from './VirtualScribe';
import PastMeetings from './PastMeetings';
class Right extends Component {
    constructor(props){
        super(props);
        /*<div className="past-meeting-section">
                 <PastMeetings />
             </div>
             <div className="virtual-scroll-section">
             <VirtualScribe />
             </div>*/
    }
   
    render() {
        return (
         <div className="right">
             
             <Profile host={this.props.host} loggedInUser={this.props.loggedInUser}/>
             
         </div>
            )
        }
    }
    
export default Right