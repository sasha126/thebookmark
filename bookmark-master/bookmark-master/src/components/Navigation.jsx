import React, { Component } from 'react';

class Navigation extends Component {
    constructor(props){
        super(props);
    }

   
    render() {
        return (
         <div className="right">
             <button>View Past Transcripts</button>
             <button>Submit New Video</button>
             <button>Take New Notes</button>
         </div>
            )
        }
    }
    
export default Navigation