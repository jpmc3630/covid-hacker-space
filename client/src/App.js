import React, { Component } from "react";
import "./App.css";
import SplitPane from 'react-split-pane';

import axios from 'axios';
import Articles from './components/Articles';
import Comments from "./components/Comments";
import Chat from "./components/Chat";
import Submission from "./components/Submission";


class App extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
      artId: null,
      commentsStatusText: `Click an article to view it's comments.`,
      commentsData: [],
      subShow: false
    };
 }

 componentDidMount() {
  
 }

 showSubModal = () => {
   this.setState({subShow: true});
 }

 hideSubModal = () => {
  this.setState({subShow: false});
  this.clickChild();
}

 loadComments = (id) => {
   this.setState({artId: id})
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
    let list = document.getElementById('users-list');
    let chat = document.getElementById('chat-text');
    chat.style.height = size - 65 + 'px';
    list.style.height = size - 13 + 'px';
}

  render() {


    return (

     

      <div className="App"> 
      {this.state.subShow &&  <Submission hideModal={this.hideSubModal}/>}
         
          <SplitPane split="horizontal" minSize={52} maxSize={52} defaultSize={52}>
              
              <div style={{paddingTop: '10px', height: '100%', overflow: 'hidden'}}>
                  <h3 style={{float: 'left', paddingLeft: 20 + 'px'}}>Covid Hacker Space</h3><h6 style={{float: 'left', paddingLeft: 10 + 'px', paddingTop: 14 + 'px', fontSize: 12 + 'px'}}>Billions of tiny factories.</h6>
                  <button className="submit-button" onClick={this.showSubModal}>Submit Article</button>
              </div>

              <SplitPane split="horizontal" size={230} maxSize={500} minSize={88} primary="second"
              onChange={size => this.moveUserList(size)}
              >
                
                      {/* <SplitPane split="vertical" defaultSize={'10%'}>
                        <div style={{overflow: 'hidden'}}>
                            <h6 style={{marginTop: 10}}>Categories</h6>
                        </div> */}

                          <SplitPane split="vertical" defaultSize={'70%'}>

                              <div style={{height: '100%', overflowX: 'auto'}}>
                                  {/* <h6 style={{marginTop: 10}}>Articles</h6> */}
                                  <Articles 
                                      loadComments={this.loadComments} 
                                      submitComment={this.submitComment} 
                                      setClick={click => this.clickChild = click}
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
                         
                      {/* </SplitPane> */}
                      
                       <SplitPane split="horizontal" defaultSize={'100%'}>
                              <div style={{width:'100%'}}>
                                  {/* <h6 style={{marginTop: 10, width: '100%'}}>Chats</h6> */}
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
