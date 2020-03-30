import React, { Component } from "react";
import moment from 'moment';

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ArticleCard from "./ArticleCard";
import axios from "axios";

import ReactDOM from "react-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import '../App.css';

class Submission extends Component {

  constructor(props){
    super(props);
    this.state = {
        data: [],
        datPreview: {
            _id: '',
            date: moment().format('LL'),

            title: '', 
            body: '', 
            byline: '', 
            url: '', 
            img: ''
        },
        itemTags: [],
        skillsTags: [],
        materialsTags: []
    };

 }

componentDidMount () {
    this.showBox();
}

componentWillUnmount () {
    
}

 handleChange = (event) => {

    let fish = this.state.datPreview;
    if (event.target.name === "byline") {
        fish[event.target.name] = 'Submitted by ' + event.target.value;
    } else {
        fish[event.target.name] = event.target.value;
    }
    
    this.setState({
        datPreview: fish 
    })
}

handleSubmit = (event) => {
    event.preventDefault();
    // this.submitArticle(this.state.nickState);
    let x = document.getElementsByClassName("sub-backdrop")[0];
    let y = document.getElementsByClassName("sub-box")[0];
    // x.style.display = 'none';
    // y.style.display = 'none';
    this.fadeOut(y);
    this.fadeOut(x);


    this.submitArticle();

}


submitArticle = async () => {

    let obj = {
        title: this.state.datPreview.title,
        byline: this.state.datPreview.byline,
        img: this.state.datPreview.img,
        body: this.state.datPreview.body,
        url: this.state.datPreview.url,
        date: this.state.datPreview.date
        // itemTags: [],
        // skillsTags: [],
        // materialsTags: []
      }

    // if (this.state.usernameText && this.state.bodyText) {
        await axios.post('/submitarticle', obj);
    
        // this.props.loadComments(this.props.artId);
        // this.setState({bodyText: ''});
    //   };

    }

showBox = () => {
    let y = document.getElementsByClassName("sub-box")[0];
    this.fadeIn(y, 1);
    let x = document.getElementsByClassName("sub-backdrop")[0];
    this.fadeIn(x, .6);
}

hideBox = () => {
    
    let y = document.getElementsByClassName("sub-box")[0];
    this.fadeOut(y);
    let x = document.getElementsByClassName("sub-backdrop")[0];
    this.fadeOut(x);
}

fadeIn = (element, opacity) => {
    element.style.display = 'block';
    window.setTimeout(function(){
        element.style.opacity = opacity;
        // element.style.transform = 'scale(1)';
        // element.style.transform = 'translate(-50%, -50%)';
        
    },0);
}

fadeOut = (element) => {
    element.style.opacity = 0;
    // element.style.transform = 'scale(0)';
    // element.style.transform = 'translate(-50%, -50%)';
    window.setTimeout(() => {
        element.style.display = 'none';
        this.props.hideModal();
    },800); // timed to match animation-duration
    
}


cancelSubmit = (event) => {
    event.preventDefault();
    this.hideBox();
    // this.props.hideModal();
    // this.submitArticle(this.state.nickState);
}

keyPress = (e) => {
    if(e.keyCode == 13){
        // this.joinChat(this.state.nickState);
    }
 }


//    var ctr = 1;
//   hint.className = hint.className !== 'show' ? 'show' : 'hide';
//   if (hint.className === 'show') {
    // hint.style.display = 'block';
    // window.setTimeout(function(){
    //   hint.style.opacity = 1;
    //   hint.style.transform = 'scale(1)';
    // },0);
//   }
//   if (hint.className === 'hide') {
//     hint.style.opacity = 0;
//     hint.style.transform = 'scale(0)';
//     window.setTimeout(function(){
//       hint.style.display = 'none';
//     },700); // timed to match animation-duration
//   }

  render() {

    return (

        <div>

                <div className="sub-backdrop"></div>

                <div className="sub-box">
                <h5 style={{margin: 10}}>Article Submission</h5>
                <h6>Basic article information</h6>
                    <Form.Control className="article-input-text" size="sm text-left" name="title" type="text" placeholder="Article Title" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                    <Form.Control className="article-input-text" size="sm text-left" name="body" type="text" placeholder="Summary" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                    <Form.Control className="article-input-text" size="sm text-left" name="url" type="url" required placeholder="Article URL" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                    <Form.Control className="article-input-text" size="sm text-left" name="img" type="url" required placeholder="Link to Image" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                    <Form.Control className="article-input-text" size="sm text-left" name="byline" type="text" maxLength="30" placeholder="Submitted by" onKeyDown={this.keyPress} onChange={this.handleChange}/>
                    <h6 style={{margin: 10}}>Please be specific as tags will help maker's find your article</h6>
                    <div className=".input-tag-wrapper">
                    <ReactTagInput
                        tags={this.state.itemTags} 
                        placeholder="Tags describing Item/Product to Manufacture"
                        maxTags={10}
                        editable={true}
                        readOnly={false}
                        removeOnBackspace={true}
                        onChange={(newTags) => this.setState({itemTags: newTags})}
                    />

                    <ReactTagInput 
                        tags={this.state.skillsTags} 
                        placeholder="Tags describing Skills and Equipment Required"
                        maxTags={10}
                        editable={true}
                        readOnly={false}
                        removeOnBackspace={true}
                        onChange={(newTags) => this.setState({skillsTags: newTags})}
                    />

                    <ReactTagInput 
                        tags={this.state.materialsTags} 
                        placeholder="Tags describing Materials Required"
                        maxTags={10}
                        editable={true}
                        readOnly={false}
                        removeOnBackspace={true}
                        onChange={(newTags) => this.setState({materialsTags: newTags})}
                        
                    />
                    </div>
                    <h6 style={{margin: 10}}>Once you are happy with the preview below you can submit</h6>
                    <ArticleCard
                            dat={this.state.datPreview}
                        />
                    
                    <Button variant="secondary" style={{margin: 20 + 'px'}} onClick={this.cancelSubmit}>
                            Cancel
                    </Button>
                    <Button variant="primary" style={{margin: 20 + 'px'}} onClick={this.handleSubmit}>
                            Submit Article
                    </Button>



                </div>



        </div>


    );
  }
}

export default Submission;
