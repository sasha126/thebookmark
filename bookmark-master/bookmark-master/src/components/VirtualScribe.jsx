import React, { Component } from 'react';
class VirtualScribe extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
      words:'',
    title:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleChange1(event) {
        this.setState({words: event.target.value});
      }

      handleChange2(event) {
        this.setState({title: event.target.value});
      }
   
    render() {
        return (
         <div>
             <div className="virtual-scribe-section">
             <h2> Virtual Scribe </h2>
             <input type="text" value={this.state.title} placeholder='Title' onChange={this.handleChange2}/>

             <input type="text" value={this.state.words} placeholder='Description' onChange={this.handleChange1}/>
             <div className="cont">
             <button>Start</button>             <button>Pause</button>              <button>Clear</button>
             </div>
             <input className="wide" type="textarea" value={this.state.value} placeholder='Output of Virtual Scribe' onChange={this.handleChange}/>
             <button className="lastButton"> Save Note </button>
             </div>
         </div> 
            )
        }
    }
    
export default VirtualScribe