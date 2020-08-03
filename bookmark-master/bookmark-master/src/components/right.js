import React, { Component } from 'react';
import Profile from './profile';
import PastMeetings from './pastMeetings';
import VirtualScribe from './virtualScribe';
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