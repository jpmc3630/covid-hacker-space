import React from "react";
import { useState, useRef } from "react";
import axios from 'axios';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'


const useFocus = () => {
  const htmlElRef = useRef(null)
  const setFocus = () => {htmlElRef.current &&  htmlElRef.current.focus()}

  return [ htmlElRef, setFocus ] 
};


function CommentsModal(props) {
    
    const [statusText, setStatusText] = useState('Loading comments....');
    const [comments, setComments] = useState([]);
    const [intervalIsSet, setIntervalIsSet] = useState(false);
    const [show, setShow] = useState(false);
    const [usernameText, setUsernameText] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [inputRef, setInputFocus] = useFocus();



    const handleClose = () => {
        //hide modal
        setShow(false);
        //clear comment refresh timer
        if (intervalIsSet) {
            clearInterval(intervalIsSet);
            setIntervalIsSet(false);
        }
    }

    const handleShow = () => {
        //load comments
        loadComments();
        //show modal
        setShow(true);
        //start comment refresh timer
        if (!intervalIsSet) {
            var interval = setInterval(loadComments, 10000);
            setIntervalIsSet(interval);
          }
        }

    const loadComments = () => {
        axios
        .get(
          `/comments/${props.artId}`
        )
        .then(({ data }) => {
            if (data.data.length < 1) {
              setStatusText('Be the first to leave a comment!');
            } else {
                setComments(data.data);
            };
        });
    }
      
    const submitComment = async () => {
      
      // props.arrIndex;
      if (usernameText && bodyText) {
          await axios.post('/submit', {
            articleId : props.artId,
            username : usernameText,
            body : bodyText
          });

          loadComments();
          props.incComFunc(props.arrIndex);
          setBodyText('');
          
        };
    }


    return (
        
      <>
        <Button variant="secondary" size="sm" onClick={handleShow}>
          Comments ({props.comTally})
        </Button>
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.artTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="comments-list">
              
                  {comments.length <= 0
                  ? <div className="comment-status-div">{statusText}</div>
                  : 
                  comments.map((comment) =>
                  <div className="comment-card card bg-light" key={comment._id}>
                    <div><div className="comment-author">{comment.username}</div>
                    <div className="comment-date">{moment(comment.created_at).fromNow()}</div></div>
                    <div className="comment-body">{comment.body}</div>
                    
                  </div>
                  )
                  }

            </div>

        <div style={{ padding: '10px' }}>
            <input
                type="text"
                onChange={(e) => setUsernameText(e.target.value)}
                placeholder="Name"
                className="comment-name-text"
                maxLength="30"
            />
            <input
                type="text"
                onChange={(e) => setBodyText(e.target.value)}
                placeholder="Comment..."
                className="comment-body-text"
                wrap="hard"
                cols={40}
                rows={10}
                value= {bodyText}
                ref={inputRef}
            />
            <Button className="comment-button" variant="secondary" size="sm" onClick={() => {submitComment(); setInputFocus();}}>
                Submit Comment
            </Button>
        </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" size="sm" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default CommentsModal;
