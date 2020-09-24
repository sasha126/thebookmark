import React, { Component } from 'react';
import Summary from './Summary';
import DownloadLinks from './DownloadLinks'
class Left extends Component {
    constructor(props){
        super(props);
    }

   
    render() {
        return (
         <div className="left">
             <Summary loggedInUser={this.props.loggedInUser}/>
             <DownloadLinks />
         </div>
            )
        }
    }
    
export default Left