import React, { Component } from 'react';
class VirtualScribe extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
       
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }
   
    render() {
        return (
         <React.Fragment>
             <h2> Virtual Scribe </h2>
             <textarea value={this.state.value} placeholder='Output of Virtual Scribe' onChange={this.handleChange}> </textarea>
             <button> Press and Speak </button>
         </React.Fragment> 
            )
        }
    }
    
export default VirtualScribe