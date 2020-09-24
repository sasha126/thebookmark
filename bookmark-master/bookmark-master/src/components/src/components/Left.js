import React, { Component } from 'react';
import Summary from './Summary';
import DownloadLinks from './DownloadLinks'
class Left extends Component {
   
    render() {
        return (
         <div className="left">
             <Summary />
             <DownloadLinks />
         </div>
            )
        }
    }
    
export default Left