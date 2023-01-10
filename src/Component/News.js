import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import { PropTypes } from 'prop-types';
export default class News extends Component {

    static defaultProps = {
        category: 'general',
        country: 'us'
    }
    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }

    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc3dde1d793e40849fb96252cda58cad&${this.state.page}&pageSize=15`;
        // let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fc3dde1d793e40849fb96252cda58cad&page=1&pageSize=15`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
    }



    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 15)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc3dde1d793e40849fb96252cda58cad&${this.state.page}&pageSize=15`;
            this.setState({
                loading: true
            })
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false

            })
        }

    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fc3dde1d793e40849fb96252cda58cad&${this.state.page}&pageSize=15`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false

        })
    }

    render() {

        return (
            <div className='container my-3'>

                <h2>News Top Headlines</h2>
                {this.state.loading && < Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 31) : ''} description={element.description ? element.description.slice(0, 50) : ''}
                                imageUrl={element.imageurl} newsUrl={element.url} />

                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}
