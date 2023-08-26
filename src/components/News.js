import React, { Component } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';

export default class News extends Component {
    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
        document.title = `${this.Capitalize(this.props.category)} - Hot News`
    }

    async handle() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d9c470d0a8e4c4b80cce67ad574efe2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }

    async componentDidMount() {
        this.handle();
    }

    handlePrepage = async () => {
        this.setState({ page: this.state.page - 1 });
        this.handle();
    };

    handleNextpage = async () => {
        this.setState({ page: this.state.page + 1 });
        this.handle();
    };

    render() {
        return (
            <div className='container my-3'>
                <div className="text-center" style={{ margin: '23px 0px' }}>
                    <h2>Hot News - {this.Capitalize(this.props.category)} TopHeadlines </h2>
                </div>
                {this.state.loading && <Spinner />}
                <div className="row my-3">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2023-08/1lcojs6_pak-cable_625x300_22_August_23.jpg"}
                                    Newsurl={element.url}
                                    date={element.publishedAt}
                                    author={element.author}
                                    source={element.source.name}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrepage} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextpage} className="btn btn-dark">Next &rarr;</button>
                </div>
            </div>
        );
    }
}
