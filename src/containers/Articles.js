import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { deleteArticle } from '../actions/articles.js'

class Articles extends Component {
    static propTypes = {
        articles: PropTypes.array,
        deleteArticle: PropTypes.func

    };

    render() {
        const { articles, deleteArticle } = this.props
        return (
            <ul>
                {articles.map(item=>{return (
                    <li key={item.id}>
                        {item.title}
                        <a href="#" onClick={()=>deleteArticle(item.id)}>delete</a>
                    </li>)
                })}
            </ul>
        )
    }
}

export default connect((state) => {
    const { articles } = state
    return { articles }
},{deleteArticle})(Articles)