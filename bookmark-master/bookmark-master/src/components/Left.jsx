import React, { Component } from 'react';
import Summary from './Summary';
import Profile from './Profile'
import PastMeetings from './PastMeetings';
import Navigation from './Navigation';
class Left extends Component {
    constructor(props){
        super(props);
    }

   
    render() {
        return (
         <div className="left">
             <Summary loggedInUser={this.props.loggedInUser}/>
         </div>
            )
        }
    }
    
export default Left