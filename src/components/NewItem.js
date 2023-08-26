import React, { Component } from 'react'

export default class NewItem extends Component {

    render() {
        let { title, description, imageUrl, Newsurl, author, date, source } = this.props
        return (
            <div>
                <div className="card">
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body"> <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: 1 }}> {source} </span>
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p class="card-text"><small class="text-body-secondary"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={Newsurl} target="_blank" className="btn btn sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
