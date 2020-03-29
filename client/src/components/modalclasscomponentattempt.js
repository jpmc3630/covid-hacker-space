import React from "react";
// import { useState } from 'react';

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// function (props) {
    

    class CommentsModal extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
                count: 0,
                show: false
            }
            this.handleClose = this.handleClose.bind(this);
            this.handleShow = this.handleShow.bind(this);
        }
      
        handleClose() {
          this.setState((prevState, props) => ({
            show: false
          }));
        }

        handleShow() {
            this.setState((prevState, props) => ({
                show: true
              }));
          }
      
    //     
    //       return (<button
    //                 onClick={() => this.updateCount()}
    //               >
    //                 Clicked {this.state.count} times
    //               </button>);
    //     }

    //   }


    // const [, setShow] = useState(false);
  
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  

    render() {
    return (
      <>
        <Button variant="secondary" size="sm" onClick={this.handleShow}>
          Show Comments
        </Button>
        
        <Modal show={this.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.artTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
          {this.props.comments}
          </div>
            <form action="/submit" method="post">
                <h6>Comments!</h6>
                <input type="text" name="username" placeholder="Your Name"></input>
                <textarea type="text" name="body">Your comment here</textarea>
                <textarea type="text" name="articleId">{this.props.artId}</textarea>
                <input type="submit"></input>

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="secondary" size="sm" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

}

export default CommentsModal;
