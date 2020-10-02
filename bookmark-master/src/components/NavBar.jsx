import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Right from './Right';
import SignIn from './SignIn';
import Title from './Title';
import Left from './Left';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            host:"http://192.168.1.33:5000"
        }
        this.next=this.next.bind(this);
        this.re=this.re.bind(this);
    }

re = () => {
    ReactDOM.render(<div className="App">
 
        <Title/>
        <SignIn/>
    
        </div>,document.getElementById('root'));
}

    next() {
        ReactDOM.render(<div className="App">
 
        <NavBar />
        <main>
               <Right host={this.state.host} loggedInUser={this.props.loggedInUser}/>
        </main>
    
        </div>,document.getElementById('root'));
    }
   
    render() {
        return (
          <header className="hello" >
              
               <a href="#" onClick={this.next}><h1>THE BOOKMARK</h1> </a>
               <span>
                 <button onClick={this.re}>Logout</button>
                 </span>
            </header> 
            )
        }
    }
    
export default NavBar