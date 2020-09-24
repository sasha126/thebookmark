import React, { Component } from 'react';
class PastMeetings extends Component {
   
    render() {
        const MeetingList = [
            { id: 1,
              title: 'List item',
            },
            { id: 2,
              title: 'List item',
            },
            { id: 3,
              title: 'List item',
            },
            { id: 4,
              title: 'List item',
            },
            { id: 5,
             title: 'List item',
            },
            { id: 6,
                title: 'List item',
              },
              { id: 7,
                title: 'List item',
              },
              { id: 8,
                title: 'List item',
              },
              { id: 9,
                title: 'List item',
              },
              { id: 10,
               title: 'List item',
              },

          ];

          const Meetings = MeetingList.map(item => (
            <li key={item.id}><a href="#" >{item.title}</a></li>
            ))
        return (
          <React.Fragment>
            <div className="pm">
            <h2>Past Meetings </h2>
            <div className="meetings-list">
                    <ul>
                        {Meetings}
                    </ul>
           </div>
           </div>
        </React.Fragment>
            )
        }
    }
    
export default PastMeetings