import React, { Component } from 'react';
import Summary from './Summary';
class Left extends Component {
    constructor(props){
        super(props);
    }

   
    render() {
        return (
         <div className="left">
             <Summary host={this.props.host} loggedInUser={this.props.loggedInUser}/>
         </div>
            )
        }
    }
    
export default Left