import React, { Component } from 'react';
import NewItem from './NewItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0

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

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d9c470d0a8e4c4b80cce67ad574efe2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        });
    }

    render() {
        return (
            <>
                <div className="text-center" style={{ margin: '23px 0px' }}>
                    <h2>Hot News - {this.Capitalize(this.props.category)} TopHeadlines </h2>
                </div>
                {/* {this.state.loading && <Spinner />} */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
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
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}
