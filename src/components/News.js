import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {

    constructor(){
        super();
        // console.log("Hello i am constructor from news component.");
        this.state = {
            articles: [],
            loading: true,
            page: 1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=b9f68b2501734c11b42dfed59f9baf80&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults
        })
    }

    handlePrevClick = async() => {
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b9f68b2501734c11b42dfed59f9baf80&page=${this.state.page - 1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);
      this.setState({
        page: this.state.page - 1,
        articles: parsedData.articles
      })
    }

    handleNextClick = async() => {
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

      }
      else{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=b9f68b2501734c11b42dfed59f9baf80&page=${this.state.page + 1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          page: this.state.page + 1,
          articles: parsedData.articles
        })
      }
    }

  render() {
    return (
      <div className='container my-3'>
        <h1>News Monkey - Top Headlines</h1>
        <div className="row">
        {this.state.articles.map((element)=> {
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
        })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News