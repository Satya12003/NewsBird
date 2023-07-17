import React, { Component } from 'react'
import Loader from './Loader';
import NewsItem from './NewsItem';

export class Sports extends Component {
    constructor(){
        super();
        this.state = {
            articles : [],
            loading : false,
            page: 1
        }
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d37723633a040be9d5e9b3a37f03579&pageSize=${this.props.size}`
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles,totalResults : parsedData.totalResults})
    }
    handleNextClick = async ()=>{
        if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.size)))
        {
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d37723633a040be9d5e9b3a37f03579&page=${this.state.page + 1}&pageSize=${this.props.size}`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({page : this.state.page + 1,
            articles : parsedData.articles,
            loading : false})
        }
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5d37723633a040be9d5e9b3a37f03579&page=${this.state.page - 1}&pageSize=${this.props.size}`
        this.setState({loading : true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({page : this.state.page - 1,
            articles : parsedData.articles,
          loading : false})
    }
  render() {
    return (
        <div>
        <div className='container'>
            <h1 className='text-center'>Todays Sports Healines</h1>
            {this.state.loading && <div className='text-center my-5 p-5'><Loader/></div>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                <NewsItem title = {element.title} descreption = {element.description} imgtoshow = {element.urlToImage} link = {element.url} />
            </div>
            })}
            </div>
            <div className="d-flex justify-content-between">
            <button type="button" disabled = {this.state.page <= 1 } className="btn btn-warning" onClick={this.handlePrevClick}> &#8592; Previous</button>
            <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.size)} className="btn btn-warning" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
      </div>
    )
  }
}

export default Sports
