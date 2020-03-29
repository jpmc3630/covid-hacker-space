
import React, { Component } from "react";
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



class Comments extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      usernameText: null,
      bodyText: null
    };
 }


 submitComment = async () => {

    // props.arrIndex;
    if (this.state.usernameText && this.state.bodyText) {
        await axios.post('/submit', {
          articleId : this.props.artId,
          username : this.state.usernameText,
          body : this.state.bodyText
        });
    
        this.props.loadComments(this.props.artId);
      //   props.incComFunc(props.arrIndex);
        this.setState({bodyText: ''});
        
      };
    }

  render() {

    return (

            <>

                <div className="comments-list">
                <h5>Comments</h5>
                    {this.props.comments.length <= 0
                    ? <div className="comment-status-div">{this.props.statusText}</div>
                    : 
                    this.props.comments.map((comment) =>
                    <div className="comment-card card bg-light" key={comment._id}>
                        <div><div className="comment-author">{comment.username}</div>
                        <div className="comment-date">{moment(comment.created_at).fromNow()}</div></div>
                        <div className="comment-body">{comment.body}</div>
                        
                    </div>
                    )
                    }

                </div>

                <div className="submit-comment" style={{ padding: '10px' }}>
                    <input
                        type="text"
                        onChange={(e) => this.setState({usernameText: e.target.value})}
                        placeholder="Name"
                        className="comment-name-text"
                        maxLength="30"
                    />
                    <input
                        type="text"
                        onChange={(e) => this.setState({bodyText: e.target.value})}
                        placeholder="Comment..."
                        className="comment-body-text"
                        wrap="hard"
                        cols={40}
                        rows={10}
                        value= {this.props.bodyText}
                        ref={this.inputRef}
                    />
                    <Button className="comment-button" variant="secondary" size="sm" onClick={this.submitComment}>
                        Submit Comment
                    </Button>
                </div>

            </>


    );
  }
}

export default Comments;
