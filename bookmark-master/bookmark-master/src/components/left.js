import React, { Component } from 'react';
import Summary from './summary';
import DownloadLinks from './downloadLinks'
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