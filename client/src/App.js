import React, { Component } from "react";
import "./App.css";
import SplitPane from 'react-split-pane';

import axios from 'axios';
import Articles from './components/Articles';
import Comments from "./components/Comments";
import Chat from "./components/Chat";



class App extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
      artId: null,
      commentsStatusText: `Click an article to view it's comments.`,
      commentsData: []
    };
 }

 loadComments = (id) => {
   this.setState({artId: id})
  console.log(id);
  axios
  .get(
    `/comments/${id}`
  )
  .then(({ data }) => {
      if (data.data.length < 1) {
        this.setState({commentsStatusText: 'There are no comments for this article.', commentsData: []});
      } else {
          this.setState({commentsData: data.data});
      };
  });
}

moveUserList = (size) => {
    let fish = document.getElementById('users-list');
    fish.style.bottom = size - 200 + 'px';
    fish.style.height = size;
    fish.setAttribute('size', 50)
    console.log(size);
}

  render() {


    return (
      <div className="App">

          <SplitPane split="horizontal" minSize={0} maxSize={32} defaultSize={32}>
              
              <div style={{height: '100%', overflow: 'hidden'}}>
                  <h3 style={{paddingLeft: 20 + 'px'}}>Covid Makers</h3>
              </div>

              <SplitPane split="horizontal" size={230} maxSize={500} minSize={88} primary="second"
              onChange={size => this.moveUserList(size)}
              >
                
                      <SplitPane split="vertical" defaultSize={'10%'}>
                        <div style={{overflow: 'hidden'}}>
                            <h5 style={{marginTop: 10}}>Categories</h5>
                        </div>

                          <SplitPane split="vertical" defaultSize={'70%'}>

                              <div style={{height: '100%', overflowX: 'auto'}}>
                                  <h5 style={{marginTop: 10}}>Articles</h5>
                                  <Articles 
                                      loadComments={this.loadComments} 
                                      submitComment={this.submitComment} 
                                  />
                              </div>

                              <div>
                                  <Comments            
                                      comments={this.state.commentsData}
                                      artId={this.state.artId} 
                                      loadComments={this.loadComments}
                                      
                                      bodyText={this.state.commentsBodyText}
                                      statusText={this.state.commentsStatusText}
                                  />
                              </div>

                          

                          </SplitPane>
                         
                      </SplitPane>
                      
                       <SplitPane split="horizontal" defaultSize={'100%'}>
                              <div style={{width:'100%'}}>
                                  {/* <h5 style={{marginTop: 10, width: '100%'}}>Chats</h5> */}
                                    <Chat />
                              </div>
                      </SplitPane> 
              </SplitPane>

          </SplitPane>
          
       

      </div>
    );
  }
}

export default App;
