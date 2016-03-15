import React, { Component, PropTypes } from 'react'
import ArticleList from './ArticleList'
import {articleStore} from '../stores'

class Container extends Component {
    constructor() {
        super()
        this.state = {
            articles: articleStore.getAll()
        }
    }

    componentDidMount() {
        articleStore.addChangeListener(this.articlesChanged)
    }

    componentWillUnmount() {
        articleStore.removeChangeListener(this.articlesChanged)
    }

    articlesChanged =() => {
        this.setState({
            articles: articleStore.getAll()
        })
    }

    render() {
        return (
            <div>
                <ArticleList articles = {this.state.articles}/>
            </div>
        )
    }
}

export default Container