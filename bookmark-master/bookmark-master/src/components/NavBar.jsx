import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Right from './Right';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.next=this.next.bind(this);
    }

    next() {
        ReactDOM.render(<div className="App">
 
        <NavBar />
        <main>
               <Right loggedInUser={this.props.loggedInUser}/>
        </main>
    
        </div>,document.getElementById('root'));
    }
   
    render() {
        return (
          <header className="hello" onClick={this.next}>
              
               <h1><a>THE BOOKMARK</a></h1> 
                <nav>
        <span></span>
                </nav>
                 
            </header> 
            )
        }
    }
    
export default NavBar