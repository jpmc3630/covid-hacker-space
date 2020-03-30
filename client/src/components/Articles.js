
import React, { Component } from "react";

import ArticleCard from "./ArticleCard";
import axios from 'axios';
import Navbar from "./Navbar";
class Articles extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: [],
      statusText: 'Loading...',
      search: 'noSearch',
      sort: 'initial',
      selectedCard: null,
      
    };
    this.getAlert = this.getAlert.bind(this);
 }

 componentDidMount() {
    this.handleSearch();
    this.props.setClick(this.getAlert);
  }


 getAlert() {
    this.getScrape();
 }

  updateSearch = async (newSearch) => {await this.setState({search: newSearch});};
  updateSort = async (newSort) => {await this.setState({sort: newSort});};

  getScrape = async (order) => {
      let scrapeData = await axios.get(`/scrape/${order}`);
      this.setState(scrapeData.data);
  };

  handleSearch = async (criteria, order) => { 
      if (criteria) {
          this.setState({search: criteria});
          this.setState({statusText: `Searching for '${criteria}' ...`});
      let searchData = await axios.get(`/search/${criteria}/${this.state.sort}`);
      if (searchData.data.data.length < 1) this.setState({statusText: `No results found for '${criteria}'`}) ;
      this.setState({data: searchData.data.data});  
      } else {
          this.setState({statusText: `Loading ...`});
          this.getScrape(order);
      }
    };

    doSort = async (order) => {
      let sortData = await axios.get(`/search/${this.state.search}/${order}`);
      this.setState(sortData.data);
  };

  handleSortOrder = async (order) => { this.doSort(order); };
  
  incrementCommentButton = (arrIndex) => {
    let temp = this.state.data;
    
    temp[arrIndex].commentsTally++;
    this.setState({data: temp});
  };

  comKey = async (asd) => { 
    let eee = asd + 'com';
    return eee;
  };

  clickArticleCard(id) {
      this.props.loadComments(id);
      this.setState({selectedCard: id})
  }



  render() {

    const { data } = this.state;

    return (
            <div className="container-fluid pb-3">
                <div className="row justify-content-md-center">
                
                <Navbar 
              handleSearch = {this.handleSearch} 
              handleSortOrder = {this.handleSortOrder}
              updateSearch = {this.updateSearch} 
              updateSort = {this.updateSort}
              
                />

                    {data.length <= 0
                    ? <div className="status-div">{this.state.statusText}</div>
                    : data.map((dat, index) => (
                        
                        <ArticleCard
                            customClickEvent={this.clickArticleCard.bind(this, dat._id)}
                            key={dat._id}
                            dat={dat}
                            index={index}
                            onClick={this.booyah}
                            selectedCard={this.state.selectedCard}
                        />

                    ))}

                </div>
            </div>
    );
  }
}

export default Articles;



