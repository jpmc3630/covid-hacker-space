import React, { Component } from "react";
import moment from 'moment';


class ArticleCard extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
     
    };
 }


  render() {

    const { dat } = this.props;
    return (



        <div key={dat._id} className="card bg-light news-card" onClick={this.props.customClickEvent} style={this.props.selectedCard === dat._id ? {borderColor: 'blue'}:{}}>
          <div className="card-body">
              <div className="news-image cover" style={{ backgroundImage: `url(${dat.img})` }}></div>
              <div className="news-content">
                  <p className="news-title">{dat.title}</p>
                  <p className="news-body">{dat.body}</p>
                  <span className="news-byline"><span className="news-author">{dat.byline}&nbsp;&nbsp; 
                      {moment(dat.date).fromNow()}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <a href={dat.url} rel="noopener noreferrer" target="_blank" className="news-url">Full Article</a>&nbsp;&nbsp;&nbsp;&nbsp;
                      
                      {/* <CommentsModal 
                          key={dat._id}
                          arrIndex={this.props.index} 
                          comTally={dat.commentsTally} 
                          // incComFunc={this.incrementCommentButton}
                          artId={dat._id} 
                          artTitle={dat.title} 
                          comments={dat.commentsIds} 
                          onClick={this.loadCommentsFromDB}
                      /> */}
                      </span>
                  
              </div>
          </div>
        </div>




    );
  }
}

export default ArticleCard;
