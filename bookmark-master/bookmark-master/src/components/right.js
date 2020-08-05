import React, { Component } from 'react';
import Profile from './Profile';
import PastMeetings from './PastMeetings';
import VirtualScribe from './VirtualScribe';
class Right extends Component {
   
    render() {
        return (
         <div className="right">
             <div className="profile-section">
             <Profile />
             </div>
             <div className="past-meeting-section">
                 <PastMeetings />
             </div>
             <div className="virtual-scroll-section">
             <VirtualScribe />
             </div>
           
           
         </div>
            )
        }
    }
    
export default Right