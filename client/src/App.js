import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SplitPane, { Pane } from 'react-split-pane';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          
        </div> */}
          <SplitPane split="horizontal" defaultSize={'7%'}>
                  <h3 style={{paddingLeft: 20 + 'px'}}>Covid Makers</h3>
        


              <SplitPane split="horizontal" defaultSize={'60%'}>
                
                      <SplitPane split="vertical" defaultSize={'15%'}>
                        <div>
                            <h4>Categories</h4>
                        </div>

                          <SplitPane split="vertical" defaultSize={'60%'}>
                              <div>
                                  <h4>Articles</h4>
                              </div>

                              <SplitPane split="vertical" defaultSize={'100%'}>
                                      <h4>Comments</h4>

                                      
                              </SplitPane>


                          </SplitPane>


                          
                      </SplitPane>

                    <SplitPane split="horizontal" defaultSize={'100%'}>
                            
                                <h4 className="h-center">Chats</h4>
                            
                      
                    </SplitPane>

              </SplitPane>

          </SplitPane>
          
      </div>
    );
  }
}

export default App;
