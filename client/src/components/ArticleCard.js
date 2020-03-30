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
                  <span className="news-byline"><span className="news-author">{dat.byline}&nbsp;&nbsp; &nbsp;&nbsp; 
                    {moment(dat.date).format('LL')}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    {dat.url === '' 
                    ? 
                    <span>No URL</span> 
                    : 
                    <a href={dat.url} rel="noopener noreferrer" target="_blank" className="news-url">Full Article</a>}&nbsp;&nbsp;&nbsp;&nbsp;
                  </span>                  
              </div>
          </div>
        </div>


    );
  }
}

export default ArticleCard;
