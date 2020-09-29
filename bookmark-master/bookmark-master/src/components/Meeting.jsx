import React, { Component } from 'react';
import axios from 'axios';


class Meeting extends Component {
    constructor(props){
        super(props);
        this.state={
            requests:{}
        };
    }


    componentDidMount() {
        var host = "http://192.168.1.34:5000";
        axios.post(host+'/standingFunction', {
          "username" : this.props.loggedInUser
      }).then(response=>this.setState({requests:response['data']['videoDetails']}, () => console.log(this.state.requests)));
     
    }

    render() {
        var i=0;

        return(
            <div>
           
            </div>
        );
    }
}

export default Meeting