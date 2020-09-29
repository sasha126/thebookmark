import React, { Component } from 'react';
class DownloadLinks extends Component {

  constructor() {
    super();
    this.state = {
        requests: [],
        isLoaded: false,
        eror:null
        }
      }

    render() {
          const list = [
            { id: 1,
              title: 'Download Transcript',
              link: 'www.google.com',
            },
            
            { id: 2,
              title: 'Download Summary',
              link: 'www.google.com',
            },

            {
              id: 3,
              title: 'View Video',
              link: 'www.google.com',
            }
          ];

          const listItems = list.map(item => (
            <li key={item.id}> <a href={item.link} download >{item.title}</a></li>
            ))
        return (
         <ul className="list-wrapper"> 
        {listItems}
         </ul>
            )
        }
    }
    
export default DownloadLinks