import React, { Component } from 'react';
import userImg from "../images/user.jpg"
class Profile extends Component {
    
    render() {
        const doneList = [
            { id: 1,
              title: 'Summarised 13 meetings',
            },
            { id: 2,
              title: 'Used Scribe 8 times',
            },
            { id: 3,
              title: 'Most Used Feature: Transcription',
            },
            { id: 4,
              title: 'Recent Meeting Yesterday',
            },
            { id: 5,
             title: 'View Personal Data',
            },

          ];

          const TasksCompleted = doneList.map(item => (
            <li key={item.id}>{item.title}</li>
            ))
        return (
          <React.Fragment>
          <h2> My Profile </h2>
        <div className="profile-card">
            <span className="bar"></span>
            <img src={userImg} alt="user" />
            <h4> Hello User! </h4>
            <ul>
                {TasksCompleted}
            </ul>
        </div>
        </React.Fragment>
            )
        }
    }
    
export default Profile